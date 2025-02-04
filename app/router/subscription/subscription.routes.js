module.exports = app => {
    const subscription_controller = require("../../controller/subscription/subscription.controller");
    const payment_controller = require("../../controller/subscription/payment.controller")
    const tenant_controller = require("../../controller/subscription/tenant.controller")
    const webhook_controller = require("../../controller/subscription/webhook.controller")
    var router = require("express").Router();
  
    router.post("/create_plan",subscription_controller.create_plan)
    router.post("/webhook/razorpay", subscription_controller.subscription);
    router.post("/signUp",tenant_controller.createTenant)
  
    app.use('/api/v1', router);
  };
  