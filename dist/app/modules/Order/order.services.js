"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRevenue = exports.createOrder = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, product, quantity, totalPrice } = payload;
    const book = yield prisma_1.default.book.findUnique({ where: { id: product } });
    if (!book)
        throw new Error("Book not found");
    if (book.quantity < quantity) {
        throw new Error("Insufficient stock");
    }
    const [order] = yield prisma_1.default.$transaction([
        prisma_1.default.order.create({
            data: {
                email,
                quantity,
                totalPrice,
                product,
            },
        }),
        prisma_1.default.book.update({
            where: { id: product },
            data: {
                quantity: book.quantity - quantity,
                inStock: book.quantity - quantity > 0,
            },
        }),
    ]);
    return order;
});
exports.createOrder = createOrder;
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.aggregate({
        _sum: {
            totalPrice: true,
        },
    });
    return result._sum.totalPrice || 0;
});
exports.calculateRevenue = calculateRevenue;
