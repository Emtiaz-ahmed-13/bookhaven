import { User } from "@prisma/client";
import ApiError from "../app/errors/ApiError";
import prisma from "../app/shared/prisma";

// Type for the basic user without relations
type BasicUser = User;

/**
 * Find a user by their ID
 * @param id - The user's unique identifier
 * @returns Promise<BasicUser> - The user object without relations
 * @throws ApiError if user is not found
 */
export const findUserById = async (id: string): Promise<BasicUser> => {
  if (!id || typeof id !== 'string') {
    throw new ApiError(400, "Invalid user ID provided");
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  
  return user;
};

/**
 * Find a user by their email address
 * @param email - The user's email address
 * @returns Promise<BasicUser> - The user object
 * @throws ApiError if user is not found
 */
export const findUserByEmail = async (email: string): Promise<BasicUser> => {
  if (!email || typeof email !== 'string') {
    throw new ApiError(400, "Invalid email provided");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  
  return user;
};

/**
 * Check if a user exists by email (without throwing an error)
 * @param email - The user's email address
 * @returns Promise<boolean> - True if user exists, false otherwise
 */
export const userExistsByEmail = async (email: string): Promise<boolean> => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true }, // Only select id for performance
  });

  return !!user;
};

/**
 * Check if a user exists by ID (without throwing an error)
 * @param id - The user's unique identifier
 * @returns Promise<boolean> - True if user exists, false otherwise
 */
export const userExistsById = async (id: string): Promise<boolean> => {
  if (!id || typeof id !== 'string') {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true }, // Only select id for performance
  });

  return !!user;
};

// Export types for use in other files
export type { BasicUser };
