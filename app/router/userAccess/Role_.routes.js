module.exports = (app) => {
  const controller = require("../../controller/userAccess/Role.controller");
  const Authenticator = require("../../utils/Authenticator.js");
  const AccessChecker = require("../../utils/AccessChecker.js");
  const Subscription = require("../../utils/Subscription.js");
  var router = require("express").Router();

  router.post(
    "/create_role",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.create_role
  );
  router.put(
    "/update_role",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_amend,
    controller.update_role
  );
  router.get(
    "/get_role",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.get_role
  );
  router.get(
    "/get_all_role",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.find_all_role
  );
  router.delete(
    "/delete_role",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_delete,
    controller.delete_role
  );

  app.use("/api/v1/crm/", router);
};
