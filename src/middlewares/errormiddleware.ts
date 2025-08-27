import { Request, Response, NextFunction } from "express";
import { ApiError } from "./apierror.js";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: false,
      message: err.message,
    });
  }

  // Handle unknown errors
  const statusCode = 500;
  const message = "Internal Server Error";

  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
  });
};
