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
exports.userExistsById = exports.userExistsByEmail = exports.findUserByEmail = exports.findUserById = void 0;
const ApiError_1 = __importDefault(require("../app/errors/ApiError"));
const prisma_1 = __importDefault(require("../app/shared/prisma"));
/**
 * Find a user by their ID
 * @param id - The user's unique identifier
 * @returns Promise<BasicUser> - The user object without relations
 * @throws ApiError if user is not found
 */
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id || typeof id !== 'string') {
        throw new ApiError_1.default(400, "Invalid user ID provided");
    }
    const user = yield prisma_1.default.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new ApiError_1.default(404, "User Not Found");
    }
    return user;
});
exports.findUserById = findUserById;
/**
 * Find a user by their email address
 * @param email - The user's email address
 * @returns Promise<BasicUser> - The user object
 * @throws ApiError if user is not found
 */
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || typeof email !== 'string') {
        throw new ApiError_1.default(400, "Invalid email provided");
    }
    const user = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new ApiError_1.default(404, "User Not Found");
    }
    return user;
});
exports.findUserByEmail = findUserByEmail;
/**
 * Check if a user exists by email (without throwing an error)
 * @param email - The user's email address
 * @returns Promise<boolean> - True if user exists, false otherwise
 */
const userExistsByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || typeof email !== 'string') {
        return false;
    }
    const user = yield prisma_1.default.user.findUnique({
        where: { email },
        select: { id: true }, // Only select id for performance
    });
    return !!user;
});
exports.userExistsByEmail = userExistsByEmail;
/**
 * Check if a user exists by ID (without throwing an error)
 * @param id - The user's unique identifier
 * @returns Promise<boolean> - True if user exists, false otherwise
 */
const userExistsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id || typeof id !== 'string') {
        return false;
    }
    const user = yield prisma_1.default.user.findUnique({
        where: { id },
        select: { id: true }, // Only select id for performance
    });
    return !!user;
});
exports.userExistsById = userExistsById;
