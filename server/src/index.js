import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/db.js";

//routers
import fileRoute from "./routes/file.route.js";
import bookRoute from "./routes/book.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
// const allowedOrigins = [
//   "https://notionlist.netlify.app",
//   "https://notionlist.netlify.app/",
//   // "http://localhost:5173",
// ];

dotenv.config();
app.use(express.json());
app.use(cors({ origin: "https://notionlist.netlify.app" }));

app.use("/api", fileRoute);
app.use("/api", bookRoute);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Error occurred",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDB();
});
