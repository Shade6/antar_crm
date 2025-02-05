module.exports = (app) => {
  const controller = require("../../controller/userAccess/Dashboard.controller.js");
  const Authenticator = require("../../utils/Authenticator.js");
  const AccessChecker = require("../../utils/AccessChecker.js");
  const Subscription = require("../../utils/Subscription.js")

  var router = require("express").Router();

  router.get("/find_dashboard", Authenticator.user, controller.find_dashboard);
  router.get(
    "/dashboard_header",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.dashboard_header
  );
  router.get(
    "/find_dashboard_new_lead",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.find_dashboard_new_lead
  );
  router.get(
    "/find_dashboard_new_opportunity",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.find_dashboard_new_opportunity
  );
  router.get(
    "/find_dashboard_project_revenue",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.find_dashboard_project_revenue
  );
  router.get(
    "/find_dashboard_industry_classification",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.find_dashboard_industry_classification
  );
  router.get(
    "/find_dashboard_revenue_",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.find_dashboard_revenue_
  );
  router.get(
    "/find_dashboard_top_5_territory",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_read,
    controller.find_dashboard_top_5_territory
  );

  app.use("/api/v1/crm/", router);
};
