"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const book_controllers_1 = require("./book.controllers");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("admin"), book_controllers_1.createBookController);
router.get("/", book_controllers_1.getAllBooksController);
router.get("/:productId", book_controllers_1.getBookByIdController);
router.put("/:productId", (0, auth_1.default)("admin"), book_controllers_1.updateBookController);
exports.BookRoutes = router;
