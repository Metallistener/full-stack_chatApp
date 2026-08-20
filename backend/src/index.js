import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import healthRoutes from "./routes/health.route.js";
import { app, server } from "./lib/socket.js";
import { IS_PROD } from "./config/constants.js";

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(process.cwd(), "../.env"),
});

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: IS_PROD
      ? ["http://localhost:8080", "http://localhost"]
      : "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/health", healthRoutes);

if (IS_PROD) {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
