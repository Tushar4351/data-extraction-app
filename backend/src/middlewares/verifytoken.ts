import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request type to include userId
declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

interface JwtPayload {
  id: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decoded) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
      return;
    }
    req.id = decoded.id;
    next();
  } catch (error) {
    console.log("Error in verifyToken ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
