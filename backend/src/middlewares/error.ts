import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler.js";


export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError") err.message = "Invalid ID";

  return res
    .status(err.statusCode)
    .json({ success: false, message: err.message });
};


