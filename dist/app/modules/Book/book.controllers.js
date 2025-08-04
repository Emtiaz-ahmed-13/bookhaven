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
exports.updateBookController = exports.getAllBooksController = exports.getBookByIdController = exports.createBookController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const book_services_1 = require("./book.services");
exports.createBookController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield (0, book_services_1.createBook)(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Book created successfully",
        data: book,
    });
}));
exports.getBookByIdController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield (0, book_services_1.getBookById)(req.params.productId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book retrieved successfully",
        data: book,
    });
}));
exports.getAllBooksController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const books = yield (0, book_services_1.getAllBooks)(searchTerm);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Books retrieved successfully",
        data: books,
    });
}));
exports.updateBookController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield (0, book_services_1.updateBook)(req.params.productId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book updated successfully",
        data: book,
    });
}));
