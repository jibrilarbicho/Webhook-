import { Router } from "express";
const router = Router();
import { yayawebhook } from "../controllers/webhook.js";
router.post("/yaya-webhook", yayawebhook);
export default router;
