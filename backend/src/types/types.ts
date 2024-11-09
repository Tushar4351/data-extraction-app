import { Request, Response, NextFunction } from "express";

export interface NewUserRequestBody {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface NewExtractedData {
  _id: string;
  userId: string;
  fileName: string;
  name: string;
  documentNumber: string;
  expirationDate: Date;
}
