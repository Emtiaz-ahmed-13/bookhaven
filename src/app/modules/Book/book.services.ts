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

export const getAllBooks = async (searchTerm?: string) => {
  const where = searchTerm
    ? {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
          {
            author: {
              contains: searchTerm,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
          { category: { equals: searchTerm as Category } },
        ],
      }
    : {};
  const books = await prisma.book.findMany({ where });
  return books;
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
  }>
) => {
  const book = await prisma.book.update({
    where: { id },
    data,
  });
  return book;
};
