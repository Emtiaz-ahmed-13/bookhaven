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
    const { searchTerm } = req.query;
    const books = await getAllBooks(searchTerm as string | undefined);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
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
