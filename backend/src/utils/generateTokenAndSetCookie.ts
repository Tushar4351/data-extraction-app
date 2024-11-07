import { Response } from "express";
import jwt from "jsonwebtoken";
import { NewUserRequestBody } from "../types/types.js";

export const generateTokenAndSetCookie = (
  res: Response,
  user: NewUserRequestBody
): string => {
  const jwtSecret = process.env.JWT_SECRET;
  console.log(jwtSecret);

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  const token = jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
