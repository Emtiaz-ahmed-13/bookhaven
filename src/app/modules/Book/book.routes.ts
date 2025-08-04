import express from "express";
import auth from "../../middleware/auth";
import {
  createBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
} from "./book.controllers";

const router = express.Router();

router.post("/", auth("admin"), createBookController);
router.get("/", getAllBooksController);
router.get("/:productId", getBookByIdController);
router.put("/:productId", auth("admin"), updateBookController);

export const BookRoutes = router;
