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
exports.updateBook = exports.getAllBooks = exports.getBookById = exports.createBook = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.create({
        data: payload,
    });
    return book;
});
exports.createBook = createBook;
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({ where: { id } });
    return book;
});
exports.getBookById = getBookById;
const getAllBooks = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const where = searchTerm
        ? {
            OR: [
                {
                    title: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    author: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                { category: { equals: searchTerm } },
            ],
        }
        : {};
    const books = yield prisma_1.default.book.findMany({ where });
    return books;
});
exports.getAllBooks = getAllBooks;
const updateBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.update({
        where: { id },
        data,
    });
    return book;
});
exports.updateBook = updateBook;
