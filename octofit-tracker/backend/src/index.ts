import express from "express";
import mongoose from "mongoose";

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/octofit-tracker";

app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on http://localhost:${port}`);
});

void mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(`MongoDB connected at ${mongoUri}`);
  })
  .catch((error: unknown) => {
    console.error("MongoDB connection failed", error);
  });