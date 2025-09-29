import multer from "multer";
import BookService from "../services/book.service.js";

class StreamStorage {
  _handleFile(req, file, cb) {
    console.log("file triggered");
    BookService.processCsv(file.stream)
      .then((result) => cb(null, { size: file.size, result }))
      .catch((err) => cb(err));
  }

  _removeFile(req, file, cb) {
    // No disk storage, so just callback
    cb(null);
  }
}

const bookStore = multer({
  storage: new StreamStorage(),
  fileFilter: (req, file, cb) => {
    // Only allow files with mimetype 'text/csv'
    if (file.mimetype === "text/csv") {
      cb(null, true); // Accept file
    } else {
      cb(new Error("Only CSV files are allowed"), false); // Reject file
    }
  },
});
export default bookStore;
