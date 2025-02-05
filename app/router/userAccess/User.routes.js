module.exports = (app) => {
  const controller = require("../../controller/userAccess/UserController.controller");
  const Authenticator = require("../../utils/Authenticator.js");
  const AccessChecker = require("../../utils/AccessChecker.js");
  const Subscription = require("../../utils/Subscription.js");
  var router = require("express").Router();

  router.post(
    "/create_user",
    Authenticator.user,
    Subscription.check_subscription,
    controller.create_user
  );
  router.post("/login",
     controller.login);
  router.put(
    "/update_user",
    Authenticator.user,
    Subscription.check_subscription,
    controller.update_user
  );
  router.get(
    "/findUserById",
    Authenticator.user,
    Subscription.check_subscription,
    controller.get_user
  );
  router.get(
    "/get_all_user",
    Authenticator.user,
    AccessChecker.access_read,
    controller.find_all_user
  );
  router.delete(
    "/delete_user",
    Subscription.check_subscription,
    controller.delete_user
  );

  app.use("/api/v1/crm/", router);
};
