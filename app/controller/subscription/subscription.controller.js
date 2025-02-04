const db = require('../../models')
const Payment = db.payment;
const Subscription = db.subscription;
const Plan = db.plan;
const crypto = require("crypto");

exports.subscription=async(req,res)=>{
    try {
        console.log("Webhook received:", JSON.stringify(req.body, null, 2));
        const secret = process.env.SIGNATURE; // Move this to environment variables
      
        const razorpaySignature = req.headers["x-razorpay-signature"];
        const body = JSON.stringify(req.body);
      
        // Verify Razorpay Webhook Signature
        const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");
      
        if (expectedSignature !== razorpaySignature) {
          return res.status(400).json({ message: "Invalid signature" });
        }
      
        const event = req.body.event;
        console.log("Event Received:", event);
        const payload = req.body.payload;
      
        try {
          if (event === "payment.captured") {
            const paymentData = payload.payment.entity;
            console.log("paymentData" , paymentData);
      
            // Extract payment details
            const paymentId = paymentData.id;
            const amount = paymentData.amount / 100; 
            const tenantId = paymentData.notes?.tenant_id || null; // Capture tenant_id
            const method = paymentData.method;
            const currency = paymentData.currency.toUpperCase();
            const subscriptionId = paymentData.subscription_id || null;
            const transactionId = paymentData.id;
            const billDate = new Date(paymentData.created_at * 1000).toISOString();
      
            console.log("Extracted subscription ID:", subscriptionId);
      
            if (!subscriptionId) {
              console.error("Subscription ID missing in payment.captured webhook");
              return res.status(400).json({ message: "Subscription ID not found in event data" });
            }
      
            // Create Payment Entry
            await Payment.create({
              transaction_id: transactionId,
              tenant_id: tenantId,
              subscription_id: subscriptionId,
              amount,
              status: "successful",
              payment_method: paymentMethod,
              currency,
              payment_date: billDate,
            });
      
            // Update Subscription Table if needed
            await Subscription.update(
              { bill_date: new Date(), payment_amount: amount, payment_method: paymentMethod },
              { where: { subscription_id: subscriptionId } }
            );
      
            console.log("Payment and Subscription updated successfully.");
          }
      
          if (event === "subscription.activated") {
            const subscriptionId = payload.subscription.entity.id;
      
            await Subscription.update(
              { status: "active" },
              { where: { subscription_id: subscriptionId } }
            );
          }
      
          return res.json({ success: true, message: "Webhook processed successfully" });
        } catch (error) {
          console.error("Webhook processing error:", error);
          return res.status(500).json({ success: false, error: "Internal server error" });
        }
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.create_plan =async(req,res)=>{
    const {name,description,monthly_price,annual_price,features} = req.body;
    const create_plan = await Plan.create({
        name:name,
        description:description,
        monthly_price:monthly_price,
        annual_price:annual_price,
        features:features
    })
    return res.json({message:'plan created successfully',statusCode:200,data:create_plan})
} 