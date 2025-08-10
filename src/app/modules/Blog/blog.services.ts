import prisma from "../../shared/prisma";
import { Prisma } from "@prisma/client";

export const createBlog = async (payload: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  author: string;
}) => {
  return prisma.blog.create({ data: payload });
};

export const getAllBlogs = async (q?: string) => {
  const where: Prisma.BlogWhereInput | undefined = q
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { excerpt: { contains: q, mode: "insensitive" } },
          { author: { contains: q, mode: "insensitive" } },
        ],
      }
    : undefined;
  return prisma.blog.findMany({ where, orderBy: { createdAt: "desc" } });
};

export const getBlogBySlug = async (slug: string) => {
  return prisma.blog.findUnique({ where: { slug } });
};
