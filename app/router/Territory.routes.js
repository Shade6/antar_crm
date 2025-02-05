module.exports = (app) => {
  const controller = require("../../app/controller/Territory.controller");
  const Authenticator = require("../utils/Authenticator.js");
  const Subscription = require("../utils/Subscription.js");
  var router = require("express").Router();

  router.post(
    "/create_territory",
    Authenticator.user,
    Subscription.check_subscription,
    controller.create_territory
  );
  router.get(
    "/find_all_territories",
    Authenticator.user,
    Subscription.check_subscription,
    controller.find_all_territories
  );
  router.get(
    "/find_one_territory",
    Authenticator.user,
    Subscription.check_subscription,
    controller.find_one_territories
  );
  router.put(
    "/update_territory",
    Authenticator.user,
    Subscription.check_subscription,
    controller.update_territory
  );
  // router.delete("/delete_contact", contact);
  app.use("/api/v1/crm/", router);
};
