import mongoose, { Document, Schema } from "mongoose";

interface IExtractedData extends Document {
  userId: string;
  fileName: string;
  name: string;
  documentNumber: string;
  expirationDate: Date;
}

// Schema for extracted data
const ExtractedDataSchema = new Schema<IExtractedData>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  documentNumber: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

export const ExtractedData = mongoose.model<IExtractedData>(
  "ExtractedData",
  ExtractedDataSchema
);
