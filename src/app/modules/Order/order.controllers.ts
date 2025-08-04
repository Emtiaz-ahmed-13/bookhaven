import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { calculateRevenue, createOrder } from "./order.services";

export const createOrderController = catchAsync(
  async (req: Request, res: Response) => {
    const order = await createOrder(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Order created successfully",
      data: order,
    });
  }
);

export const calculateRevenueController = catchAsync(
  async (_req: Request, res: Response) => {
    const revenue = await calculateRevenue();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Revenue calculated successfully",
      data: {
        totalRevenue: revenue,
      },
    });
  }
);
