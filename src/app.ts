import express from "express";
import cors from "cors";
const app = express();
import webhookRoute from "./routes/webhookroute.js";
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
app.use("/api/v1", webhookRoute);

export default app;
