import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { BookRoutes } from "../modules/Book/book.routes";
import { OrderRoutes } from "../modules/Order/order.routes";
import { BlogRoutes } from "../modules/Blog/blog.routes";
import { StripeRoutes } from "../modules/Payment/stripe.routes";

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
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/payments",
    route: StripeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
