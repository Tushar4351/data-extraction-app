import express from "express";
import {
  deleteData,
  getAllData,
  newData,
} from "../controllers/dataExtraction.controller.js";
import { verifyToken } from "../middlewares/verifytoken.js";

const app = express.Router();

app.post("/new", verifyToken, newData);
app.get("/:id", verifyToken, getAllData);
app.delete("/:id", verifyToken, deleteData);

export default app;
