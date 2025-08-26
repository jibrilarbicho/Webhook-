import { Router } from "express";
const router = Router();
import { yayawebhook } from "../controllers/webhook";
router.post("/yaya-webhook", yayawebhook);
