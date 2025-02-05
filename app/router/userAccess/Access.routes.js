module.exports = (app) => {
  const controller = require("../../controller/userAccess/AccessManage.controller");
  const Authenticator = require("../../utils/Authenticator.js");
  const Subscription = require("../../utils/Subscription.js");
  var router = require("express").Router();

  router.get(
    "/get_access",
    Authenticator.user,
    Subscription.check_subscription,
    controller.get_user_page_access
  );
  router.get(
    "/menu",
    Authenticator.user,
    Subscription.check_subscription,
    controller.get_user_menu
  );

  app.use("/api/v1/crm/", router);
};
