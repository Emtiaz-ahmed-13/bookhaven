import bcrypt from "bcrypt";

import ApiError from "../app/errors/ApiError";
import prisma from "../app/shared/prisma";

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) throw new ApiError(404, "User Not Found");
  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new ApiError(404, "User Not Found");
  return user;
};

export const createUser = async ({
  name,
  email,
  password,
  role = "user",
}: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
  return user;
};
