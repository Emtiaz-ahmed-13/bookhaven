import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { BookRoutes } from "../modules/Book/book.routes";
import { OrderRoutes } from "../modules/Order/order.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/products",
    route: BookRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
