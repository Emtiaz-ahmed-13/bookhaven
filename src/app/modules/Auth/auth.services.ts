import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { createUser, findUserByEmail } from "../../../helpers/userHelpers";
import ApiError from "../../errors/ApiError";
import { TLogin, TRegister } from "./auth.contants";

const login = async (payload: TLogin) => {
  const { email, password } = payload;

  const user = await findUserByEmail(email);
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid Credentials.");

  const accessToken = jwtHelpers.generateToken(
    { id: user.id, role: user.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    { id: user.id, role: user.role },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const register = async (payload: TRegister) => {
  const { email } = payload;

  try {
    await findUserByEmail(email);
    throw new ApiError(409, "User already exists with this email.");
  } catch (err: any) {
    if (err.statusCode !== 404) throw err;
  }
  const user = await createUser(payload);
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const AuthServices = {
  login,
  register,
};
