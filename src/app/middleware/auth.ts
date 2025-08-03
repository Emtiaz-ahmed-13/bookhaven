import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import { jwtHelpers, TokenPayload } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

// Extend Request interface to include user property
interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

const auth = (...roles: string[]) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) throw new ApiError(401, "You are not authorized");

      // Extract the token from Bearer scheme
      const tokenWithoutBearer = token.split(" ")[1];

      if (!tokenWithoutBearer) {
        throw new ApiError(401, "Invalid token format");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        tokenWithoutBearer,
        config.jwt.jwt_secret as Secret
      );

      req.user = verifiedUser;

      // Check roles if any are specified and if user has a role
      if (roles.length && verifiedUser.role && !roles.includes(verifiedUser.role)) {
        throw new ApiError(403, "Forbidden");
      }

      // If roles are specified but user has no role, deny access
      if (roles.length && !verifiedUser.role) {
        throw new ApiError(403, "Access denied: No role assigned");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
export type { AuthenticatedRequest };
