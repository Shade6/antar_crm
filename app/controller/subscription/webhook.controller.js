const crypto = require("crypto");
const Razorpay = require("razorpay");
const db = require("../../config/db.config"); // MySQL connection

const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

exports.handleWebhookEvent = async (req, res) => {
    const secret = RAZORPAY_SECRET;

    // Razorpay sends signature in headers
    const razorpaySignature = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);

    // Verify signature
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpaySignature) {
        return res.status(400).json({ message: "Invalid signature" });
    }

    const event = req.body.event;
    const payload = req.body.payload;

    try {
        if (event === "payment.captured") {
            const paymentId = payload.payment.entity.id;
            const amount = payload.payment.entity.amount / 100; // Convert to INR
            const tenantId = payload.payment.entity.notes.tenant_id; // Assuming you store tenant_id in notes

            // Update payment status in DB
            await db.query(
                "UPDATE payments SET status = 'captured', amount = ? WHERE payment_id = ?",
                [amount, paymentId]
            );
        }

        if (event === "subscription.activated") {
            const subscriptionId = payload.subscription.entity.id;
            const tenantId = payload.subscription.entity.notes.tenant_id; 

            // Update subscription status in DB
            await db.query(
                "UPDATE subscriptions SET status = 'active' WHERE subscription_id = ?",
                [subscriptionId]
            );
        }

        if (event === "invoice.paid") {
            const invoiceId = payload.invoice.entity.id;
            await db.query(
                "UPDATE invoices SET status = 'paid' WHERE invoice_id = ?",
                [invoiceId]
            );
        }

        return res.json({ success: true, message: "Webhook received" });
    } catch (error) {
        console.error("Webhook error:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};
