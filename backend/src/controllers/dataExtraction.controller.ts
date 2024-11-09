import { Request, Response, NextFunction } from "express";
import { NewExtractedData } from "../types/types.js";
import ErrorHandler from "../utils/errorHandler.js";
import { ExtractedData } from "../models/dataExtraction.model.js";

export const newData = async (
  req: Request<{}, {}, NewExtractedData>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fileName, name, documentNumber, expirationDate, userId } = req.body;

    if (!userId || !fileName || !name || !documentNumber || !expirationDate) {
      return next(new ErrorHandler("Please add all fields", 400));
    }

    const newExtractedData = await ExtractedData.create({
      userId,
      fileName,
      name,
      documentNumber,
      expirationDate,
    });

    res.status(200).json({
      success: true,
      message: "Document created successfully",
      data: newExtractedData,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to save document data", 500));
  }
};

export const getAllData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const extractedData = await ExtractedData.find({ userId: id });

    if (!extractedData || extractedData.length === 0) {
      return next(new ErrorHandler("No documents found for this user", 404));
    }

    res.status(200).json({
      success: true,
      data: extractedData,
    });
  } catch (error) {
    console.error("Error in getAllData:", error);
    next(new ErrorHandler("Failed to retrieve document data", 500));
  }
};
export const deleteData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.id;
    console.log("document id", id);
    console.log("user id", userId);

    const deletedData = await ExtractedData.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deletedData) {
      return next(new ErrorHandler("Document not found or access denied", 404));
    }

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    next(new ErrorHandler("Failed to delete document data", 500));
  }
};
