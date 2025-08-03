import bcrypt from "bcrypt";
import ApiError from "../../errors/ApiError";
import { User } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { findUserByEmail } from "../../../helpers/userHelpers";
import prisma from "../../shared/prisma";
import type { StringValue } from "ms";

type TLogin = {
  email: string;
  password: string;
};

const login = async (payload: TLogin) => {
  // find user
  // check whether password correct
  // generate access and refresh token
  // return data
  const { email, password } = payload;

  const user = await findUserByEmail(email);

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid Credentials.");

  const { password: _, ...userWithoutPassword } = user;

  const accessToken = jwtHelpers.generateToken(
    userWithoutPassword,
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as StringValue
  );

  const refreshToken = jwtHelpers.generateToken(
    userWithoutPassword,
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expires_in as StringValue
  );

  return {
    accessToken,
    refreshToken,
    userWithoutPassword,
  };
};

export const AuthServices = {
  login,
};
