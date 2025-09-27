import { Router } from "express";
import {
  paginatedList,
  deleteRow,
  updateRow,
  download,
} from "../controllers/books.controller.js";
const router = Router();

router.post("/books/list", paginatedList);
router.delete("/book/:id", deleteRow);
router.put("/book/:id", updateRow);
router.post("/books/download", download);
export default router;
