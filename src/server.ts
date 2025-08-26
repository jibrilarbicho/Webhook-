// import crypto from "crypto";
// const secret = "test_key";
// const payload = {
//   id: "1dd2854e-3a79-4548-ae36-97e4a18ebf81",
//   amount: 100,
//   currency: "ETB",
//   created_at_time: 1673381836,
//   timestamp: Math.floor(Date.now() / 1000),
//   cause: "Testing",
//   full_name: "Abebe Kebede",
//   account_name: "abebekebede1",
//   invoice_url: "https://yayawallet.com/en/invoice/xxxx",
// };
// const signedPayload = Object.values(payload).map(String).join("");
// const signature = crypto
//   .createHmac("sha256", secret)
//   .update(signedPayload)
//   .digest("hex");
// console.log("Signature:", signature);
import app from "./app.js";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
