import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const generateToken = (
  payload: string | object | Buffer,
  secret: Secret,
  expiresIn: string | number
): string => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, secret, options);
};

const verifyToken = (token: string, secret: Secret): JwtPayload | string => {
  const cleanedToken = token.replace(/^"|"$/g, "");
  return jwt.verify(cleanedToken, secret);
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
