"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/Auth/auth.routes");
const book_routes_1 = require("../modules/Book/book.routes");
const order_routes_1 = require("../modules/Order/order.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/products",
        route: book_routes_1.BookRoutes,
    },
    {
        path: "/orders",
        route: order_routes_1.OrderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
