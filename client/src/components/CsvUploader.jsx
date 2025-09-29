import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setToast, setUploadProgress } from "../slice/bookSlice";

const CsvUploader = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { uploadStatus, uploadProgress } = useSelector((state) => state.books);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    dispatch(setUploadProgress({ status: true, progress: 0 }));
    try {
      const compressedStream = file
        .stream()
        .pipeThrough(new CompressionStream("gzip"));

      const response = await new Response(compressedStream);
      const compressedBlob = await response.blob();

      console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
      console.log(
        `Compressed size: ${(compressedBlob.size / 1024 / 1024).toFixed(2)} MB`
      );

      await uploadWithXHR(compressedBlob);

      dispatch(fetchBooks());

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      dispatch(setUploadProgress({ status: false, progress: 0 }));
      dispatch(setToast());
    }
  };

  const uploadWithXHR = (blob) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          dispatch(
            setUploadProgress({ status: true, progress: percentComplete })
          );
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          try {
            const result = JSON.parse(xhr.responseText);
            // console.log("Server response:", result);
            resolve(result);
          } catch (e) {
            resolve(xhr.responseText);
          }
        } else {
          reject(new Error(`Upload Failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error(`Error occured while uploading`));
      });

      xhr.addEventListener("timeout", () => {
        reject(new Error(`timeout error occured`));
      });

      xhr.addEventListener("abort", () => {
        reject(new Error(`Upload was aborted`));
      });

      xhr.open("POST", `${import.meta.env.VITE_API_URL}/upload`);
      // xhr.open("POST", "http://localhost:5000/api/upload");
      xhr.setRequestHeader("Content-Type", "application/gzip");
      xhr.setRequestHeader("Content-Encoding", "gzip");
      xhr.timeout = 300000;
      xhr.send(blob);
    });
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFile}
        className="hidden"
        disabled={uploadStatus}
      />
      <div className="flex flex-col items-center gap-2 mb-4">
        <button
          onClick={triggerFileSelect}
          className="py-2 px-4 bg-blue-300 text-white rounded hover:bg-blue-500 transition-colors flex justify-center items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={uploadStatus}
        >
          {uploadStatus ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Uploading... {uploadProgress}%
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span>Choose CSV File</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CsvUploader;
