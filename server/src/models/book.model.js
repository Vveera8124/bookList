import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: String,
  publishedYear: Number,
  isbn: String,
  edits: Object,
});

const Book = mongoose.model("Book", BookSchema);
export default Book;
