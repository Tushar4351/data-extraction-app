import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDB } from "./utils/mongoDBConnection.js";

//importing routes
import userRoute from "./routes/user.route.js";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";

connectDB(mongoURI);

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  console.log("Received request for /");
  res.send("API working with /api/v1");
});

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});

//using routes
app.use("/api/v1/user", userRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });