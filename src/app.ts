import express from "express";
import cors from "cors";
const app = express();
app.use(
  express.json({
    verify: (req, res, buffer) => {
      (req as any).rawBody = buffer;
    },
  })
);
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

export default app;
