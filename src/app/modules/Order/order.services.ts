import prisma from "../../shared/prisma";

export const createOrder = async (payload: {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
}) => {
  const { email, product, quantity, totalPrice } = payload;

  const book = await prisma.book.findUnique({ where: { id: product } });
  if (!book) throw new Error("Book not found");

  if (book.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  const [order] = await prisma.$transaction([
    prisma.order.create({
      data: {
        email,
        quantity,
        totalPrice,
        product,
      },
    }),
    prisma.book.update({
      where: { id: product },
      data: {
        quantity: book.quantity - quantity,
        inStock: book.quantity - quantity > 0,
      },
    }),
  ]);

  return order;
};

export const calculateRevenue = async () => {
  const result = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
  });

  return result._sum.totalPrice || 0;
};
