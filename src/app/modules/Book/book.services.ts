import { Category, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";

export const createBook = async (payload: {
  title: string;
  author: string;
  price: number;
  category: Category;
  description: string;
  quantity: number;
  inStock: boolean;
  photo: string;
}) => {
  const book = await prisma.book.create({
    data: payload,
  });
  return book;
};

export const getBookById = async (id: string) => {
  const book = await prisma.book.findUnique({ where: { id } });
  return book;
};

export const getAllBooks = async (options?: {
  searchTerm?: string;
  category?: Category | string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) => {
  const { searchTerm, category, minPrice, maxPrice, page = 1, limit = 12 } = options || {};

  const where: Prisma.BookWhereInput = {
    AND: [
      searchTerm
        ? {
            OR: [
              { title: { contains: searchTerm, mode: "insensitive" } },
              { author: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : {},
      category ? { category: { equals: category as Category } } : {},
      minPrice !== undefined ? { price: { gte: Number(minPrice) } } : {},
      maxPrice !== undefined ? { price: { lte: Number(maxPrice) } } : {},
    ],
  };

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const [total, data] = await Promise.all([
    prisma.book.count({ where }),
    prisma.book.findMany({ where, skip, take, orderBy: { createdAt: "desc" } }),
  ]);

  return {
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit || 1)) || 1,
    },
    data,
  };
};

export const updateBook = async (
  id: string,
  data: Partial<{
    title: string;
    author: string;
    price: number;
    category: Category;
    description: string;
    quantity: number;
    inStock: boolean;
    photo: string;
  }>
) => {
  const book = await prisma.book.update({
    where: { id },
    data,
  });
  return book;
};
