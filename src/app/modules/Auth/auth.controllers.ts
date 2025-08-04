import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthServices } from "./auth.services";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  const { accessToken, refreshToken } = result;
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Logged In Successfully.",
    data: { accessToken, refreshToken },
  });
});

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully.",
    data: result,
  });
});

export const AuthControllers = {
  login,
  register,
};
