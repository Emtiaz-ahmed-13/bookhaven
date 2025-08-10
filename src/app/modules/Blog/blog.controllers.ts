import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { createBlog, getAllBlogs, getBlogBySlug } from "./blog.services";

export const createBlogController = catchAsync(async (req: Request, res: Response) => {
  const blog = await createBlog(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Blog created successfully",
    data: blog,
  });
});

export const getAllBlogsController = catchAsync(async (req: Request, res: Response) => {
  const { q } = req.query;
  const blogs = await getAllBlogs((q as string) || undefined);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blogs retrieved successfully",
    data: blogs,
  });
});

export const getBlogBySlugController = catchAsync(async (req: Request, res: Response) => {
  const blog = await getBlogBySlug(req.params.slug);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog retrieved successfully",
    data: blog,
  });
});
