import { Request, Response, NextFunction } from "express";

export interface NewUserRequestBody {
  _id: string;
  name: string;
  email: string;
  password: string;
}
