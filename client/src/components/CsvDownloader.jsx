import { useState } from "react";
import BookApi from "../api/bookApi";
import { useSelector } from "react-redux";

export default function CsvDownloader() {
  const [loading, setLoading] = useState(false);
  const { filters } = useSelector((state) => state.books);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const response = await BookApi.downloadCsvFile({ filters });
      const arrayBuffer = response.data;

      if (arrayBuffer.byteLength === 0) throw new Error("Empty response");

      let csvBlob;

      const worker = new Worker(
        new URL("../workers/worker.js", import.meta.url),
        { type: "module" }
      );

      csvBlob = await new Promise((resolve, reject) => {
        worker.postMessage(arrayBuffer, [arrayBuffer]);
        worker.onmessage = (e) => {
          if (e.data.error) reject(e.data.error);
          else resolve(e.data);
          worker.terminate();
        };
        worker.onerror = (err) => reject(err);
      });

      // Trigger download
      const url = URL.createObjectURL(csvBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "books.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV download failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="px-4 py-2 bg-blue-300 hover:bg-blue-500 text-white rounded"
      >
        {loading ? "Downloading..." : "Download CSV"}
      </button>
    </div>
  );
}
