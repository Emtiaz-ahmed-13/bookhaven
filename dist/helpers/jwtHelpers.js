"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Generate a JWT token with custom expiry
 * @param payload - The data to encode in the token
 * @param secret - The secret key for signing
 * @param expiresIn - Token expiry time (e.g., "1h", "24h", "7d")
 * @returns The signed JWT token
 */
const generateToken = (payload, secret, expiresIn = "1h") => {
    // Create a payload with expiry manually to avoid type conflicts
    const now = Math.floor(Date.now() / 1000);
    // Parse expiry time
    let expSeconds;
    if (expiresIn.endsWith('h')) {
        expSeconds = parseInt(expiresIn) * 3600;
    }
    else if (expiresIn.endsWith('d')) {
        expSeconds = parseInt(expiresIn) * 86400;
    }
    else if (expiresIn.endsWith('m')) {
        expSeconds = parseInt(expiresIn) * 60;
    }
    else {
        // Default to seconds if no unit specified
        expSeconds = parseInt(expiresIn) || 3600;
    }
    const payloadWithExp = Object.assign(Object.assign({}, payload), { iat: now, exp: now + expSeconds });
    const token = jsonwebtoken_1.default.sign(payloadWithExp, secret);
    return token;
};
/**
 * Verify and decode a JWT token
 * @param token - The JWT token to verify
 * @param secret - The secret key for verification
 * @returns The decoded token payload
 * @throws Error if token is invalid or expired
 */
const verifyToken = (token, secret) => {
    try {
        // Remove quotes if present
        const tokenWithoutQuotes = token.replace(/^"|"$/g, "");
        // Use the basic verify method
        const verifiedUser = jsonwebtoken_1.default.verify(tokenWithoutQuotes, secret);
        return verifiedUser;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new Error('Token has expired');
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new Error('Invalid token');
        }
        else {
            throw new Error(`Token verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
};
/**
 * Decode a JWT token without verification (useful for debugging)
 * @param token - The JWT token to decode
 * @returns The decoded token payload or null if invalid
 */
const decodeToken = (token) => {
    try {
        const tokenWithoutQuotes = token.replace(/^"|"$/g, "");
        const decoded = jsonwebtoken_1.default.decode(tokenWithoutQuotes);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
/**
 * Check if a token is expired without verifying signature
 * @param token - The JWT token to check
 * @returns True if token is expired, false otherwise
 */
const isTokenExpired = (token) => {
    try {
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp)
            return true;
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp < now;
    }
    catch (error) {
        return true;
    }
};
exports.jwtHelpers = {
    generateToken,
    verifyToken,
    decodeToken,
    isTokenExpired,
};
