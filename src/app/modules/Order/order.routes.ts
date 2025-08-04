import express from "express";
import {
  calculateRevenueController,
  createOrderController,
} from "./order.controllers";

const router = express.Router();

router.post("/", createOrderController);
router.get("/revenue", calculateRevenueController);
export const OrderRoutes = router;
