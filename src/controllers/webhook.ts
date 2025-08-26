import { Request, Response } from "express";
import crypto from "crypto";

const YAYA_SECRET = process.env.YAYA_SECRET || "test_key_1234567890";

export const yayawebhook = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const signature = req.header["YAYA-SIGNATURE"];
    const rawBody = (req as any).rawBody;

    if (!signature || !rawBody) {
      return res.status(400).json({ error: "Missing signature or body" });
    }

    const expectedSignature = await crypto
      .createHmac("sha256", YAYA_SECRET)
      .update(rawBody)
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, "utf8"),
        Buffer.from(expectedSignature, "utf8")
      )
    ) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    res.sendStatus(200);

    console.log("Verified event:", req.body);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(500);
  }
};
