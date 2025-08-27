import { Request, Response, NextFunction } from "express";
import crypto, { sign } from "crypto";
import { ApiError } from "../middlewares/apierror.js";

const YAYA_SECRET = process.env.YAYA_SECRET || "test_key_1234567890";

export const yayawebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const signature = req.headers["yaya-signature"] as string;
    console.log("signature", signature);
    const payload = req.body;

    if (!signature || !payload) {
      throw new ApiError(400, "Missing signature or body");
    }

    const signedPayload = Object.values(payload).join("");

    const expectedSignature = await crypto
      .createHmac("sha256", YAYA_SECRET)
      .update(signedPayload)
      .digest("hex");
    console.log("expectedSignature", expectedSignature);

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, "utf8"),
        Buffer.from(expectedSignature, "utf8")
      )
    ) {
      throw new ApiError(400, "Invalid signature");
    }

    return res.status(200).json({
      status: "success",
      message: "Webhook received and verified",
      event: {
        id: payload.id,
        amount: payload.amount,
        currency: payload.currency,
        cause: payload.cause,
        account_name: payload.account_name,
      },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    if (err instanceof ApiError) {
      next(err);
    }
    next(new ApiError(500, "Internal Server Error"));
  }
};
