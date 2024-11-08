import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const newUser = async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("Please add all fields", 400));
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return next(new ErrorHandler(`Welcome, ${userAlreadyExists.name}`, 400));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    generateTokenAndSetCookie(res, user);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user.toObject(), password: undefined },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorHandler("Please enter both email and password", 400)
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Check if the password matches
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    generateTokenAndSetCookie(res, user);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name, // Include other user details as needed
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.id).select("-password");
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, user });
};
