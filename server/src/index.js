import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/db.js";

//routers
import fileRoute from "./routes/file.route.js";
import bookRoute from "./routes/book.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "https://notionlist.netlify.app",
  "https://notionlist.netlify.app/",
];

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: Origin ${origin} not allowed`), false);
      }
    },
  })
);
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
