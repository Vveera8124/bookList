import { Router } from "express";
import { fileUpload } from "../controllers/file.controller.js";
import bookStore from "../utils/bookStorage.js";
const router = Router();

router.post("/upload", bookStore.single("file"), fileUpload);

export default router;
