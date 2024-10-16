import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import jobRoutes from "./routes/job";
import { redisClient } from "./utils/redis";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_URL,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);

const startServer = async () => {
  await redisClient.connect();
  console.log("redis connected");

  server.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
  });
};

startServer();
