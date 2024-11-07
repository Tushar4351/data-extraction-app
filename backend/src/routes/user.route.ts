import express from "express";
import { checkAuth, logout, newUser, signin } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifytoken.js";

const app = express.Router();

//route - /api/v1/user/check-auth
app.get("/check-auth", verifyToken, checkAuth);
//route - /api/v1/user/new
app.post("/new", newUser);
//route - /api/v1/user/logout
app.post("/logout", logout);
//route - /api/v1/user/signin
app.post("/signin", signin);

export default app;