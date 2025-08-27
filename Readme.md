# YaYa Wallet Webhook Verification

This repository demonstrates how to verify incoming webhook requests from **YaYa Wallet** using **HMAC-SHA256** signatures.

---

## How verification works

1. YaYa sends a JSON payload to your webhook endpoint.
2. The payload values (in order) are concatenated into one string.
3. That string is signed with **HMAC-SHA256** using your secret key.
4. The result is sent in the `YAYA-SIGNATURE` header.
5. Your server must recompute the signature and compare with the header using `crypto.timingSafeEqual`.

- If they match → the request is **authentic**.
- If not → reject the request.

---

## Example test data

**Secret**  
test_key_1234567890

pgsql
Copy code

**Payload**

```json
{
  "id": "1dd2854e-3a79-4548-ae36-97e4a18ebf81",
  "amount": 150,
  "currency": "ETB",
  "created_at_time": 1673381836,
  "timestamp": 1724781480,
  "cause": "Test Payment",
  "full_name": "Abebe Kebede",
  "account_name": "abebekebede1",
  "invoice_url": "https://yayawallet.com/en/invoice/test123"
}
How to test with Postman
Use the JSON payload above as the Body.

Add a header:

makefile
Copy code
YAYA-SIGNATURE: 057ca475b67bf291e14fe1bc00aef45543ce45777a533a7df857d0ff4f71c3c7
Send the request to your webhook endpoint (e.g., http://localhost:3000/webhook).

The server should respond with 200 OK if verification passes.
```
