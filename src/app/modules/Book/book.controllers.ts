import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "./book.services";

export const createBookController = catchAsync(
  async (req: Request, res: Response) => {
    const book = await createBook(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Book created successfully",
      data: book,
    });
  }
);

export const getBookByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const book = await getBookById(req.params.productId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  }
);

export const getAllBooksController = catchAsync(
  async (req: Request, res: Response) => {
    const { q, category, minPrice, maxPrice, page, limit } = req.query as Record<string, string | undefined>;
    const result = await getAllBooks({
      searchTerm: q,
      category,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Books retrieved successfully",
      data: result.data,
      meta: result.meta,
    } as any);
  }
);

export const updateBookController = catchAsync(
  async (req: Request, res: Response) => {
    const book = await updateBook(req.params.productId, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  }
);
