import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/mongoDBConnection.js";
import cookieParser from "cookie-parser";
//importing routes
import userRoute from "./routes/user.route.js";
import dataExtractionRoute from "./routes/dataExtraction.route.js";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

connectDB(mongoURI);

const app = express();

// Order of middleware is important
app.use(express.json());
app.use(cookieParser());

// Updated CORS configuration
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

// Add security headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/", (req, res) => {
  console.log("Received request for /");
  res.send("API working with /api/v1");
});

// Using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/data", dataExtractionRoute);

// Move 404 route to the end
app.get("*", (req, res) => {
  res.status(404).send("404 URL NOT FOUND");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Accepting requests from: ${FRONTEND_URL}`);
});
