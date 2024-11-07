import mongoose from "mongoose";
import validator from "validator";

interface Iuser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    validate: validator.default.isEmail,
  },
  password: {
    type: String,
    required: true,
  },
});
export const User = mongoose.model<Iuser>("User", UserSchema);
