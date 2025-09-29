import BookService from "../services/book.service.js";

export const fileUpload = async (req, res) => {
  try {
    if (req.headers["content-type"] !== "application/gzip") {
      return res.status(415).json({
        message: "Unsupported Media Type. Expected application/gzip",
      });
    }
    const result = await BookService.processCsv(req);

    res.status(200).json({
      message: "File processed successfully",
      result,
    });
  } catch (err) {
    console.error("Upload processing error:", err);
    res.status(500).json({
      message: "An internal error occurred during stream processing.",
    });
  }
};
