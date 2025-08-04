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
exports.createUser = exports.findUserByEmail = exports.findUserById = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiError_1 = __importDefault(require("../app/errors/ApiError"));
const prisma_1 = __importDefault(require("../app/shared/prisma"));
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { id },
    });
    if (!user)
        throw new ApiError_1.default(404, "User Not Found");
    return user;
});
exports.findUserById = findUserById;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user)
        throw new ApiError_1.default(404, "User Not Found");
    return user;
});
exports.findUserByEmail = findUserByEmail;
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password, role = "user", }) {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        },
    });
    return user;
});
exports.createUser = createUser;
