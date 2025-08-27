import express from "express";
import cors from "cors";
const app = express();
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./middlewares/errormiddleware.js";
import webhookRoute from "./routes/webhookroute.js";
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "YAYA-SIGNATURE",
    ],
  })
);
app.use("/api/v1", webhookRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// 5) UNHANDLED REJECTION
process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});
// 6) UNCAUGHT EXCEPTION
process.on("uncaughtException", (err: Error) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

export default app;
