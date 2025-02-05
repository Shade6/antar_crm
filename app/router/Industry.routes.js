module.exports = (app) => {
  const controller = require("../../app/controller/Industry.controller");
  const Auth = require("../utils/Authenticator");
  const Subscription = require("../utils/Subscription.js");
  var router = require("express").Router();

  router.post(
    "/create_industry",
    Auth.user,
    Subscription.check_subscription,
    controller.create_industry
  );
  router.get(
    "/find_all_industry",
    Auth.user,
    Subscription.check_subscription,
    controller.find_all_industries
  );
  router.post(
    "/create_email",
    Auth.user,
    Subscription.check_subscription,
    controller.create_email
  );
  router.get(
    "/find_all_email",
    Auth.user,
    Subscription.check_subscription,
    controller.find_all_email
  );
  router.get(
    "/find_user_created_email",
    Auth.user,
    Subscription.check_subscription,
    controller.find_user_created_email
  );
  router.get(
    "/find_selected_user_email",
    Auth.user,
    Subscription.check_subscription,
    controller.find_selected_user_email
  );
  router.post(
    "/create_email_user_email",
    Auth.user,
    Subscription.check_subscription,
    controller.create_email_user_email
  );
  // router.get("/get_contact", contact);
  // router.get("/get_all_contact", contact);
  // router.delete("/delete_contact", contact);

  app.use("/api/v1/crm/", router);
};
