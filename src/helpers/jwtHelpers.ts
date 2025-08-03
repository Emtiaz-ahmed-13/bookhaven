import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";

const generateToken = (payload: any, secret: string, expiresIn: StringValue | number): string => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn,
  };
  
  const token = jwt.sign(payload, secret, options);

  return token;
};

const verifyToken = (token: string, secret: string): JwtPayload => {
  const tokenWithoutQuotes = token.replace(/^"|"$/g, "");

  const verifiedUser = jwt.verify(tokenWithoutQuotes, secret) as JwtPayload;

  return verifiedUser;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
