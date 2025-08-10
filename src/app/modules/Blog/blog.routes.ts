import express from "express";
import auth from "../../middleware/auth";
import { createBlogController, getAllBlogsController, getBlogBySlugController } from "./blog.controllers";

const router = express.Router();

// Public
router.get("/", getAllBlogsController);
router.get("/:slug", getBlogBySlugController);

// Admin only
router.post("/", auth("admin"), createBlogController);

export const BlogRoutes = router;
