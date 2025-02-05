module.exports = (app) => {
  const controller = require("../controller/organization/Organization.controller");
  const Authenticator = require("../utils/Authenticator.js");
  const AccessChecker = require("../utils/AccessChecker.js");
  const Subscription = require("../utils/Subscription.js")
  var router = require("express").Router();

  router.post(
    "/create_organization",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.createOrganization
  );
  router.get(
    "/get_organization_by_id",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.getOrganizationById
  );
  router.get(
    "/get_organization",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.getAllOrganizations
  );
  router.delete(
    "/delete_organization",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.deleteOrganization
  );
  router.get(
    "/get_only_organization_by_id",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.get_only_organization_by_id
  );
  router.put(
    "/update_organization",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.updateOrganization
  );
  router.get(
    "/get_existing_org_estimate",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.get_existing_org_estimate
  );

  router.get(
    "/find_all_estimate",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.find_all_estimate
  );

  router.post(
    "/create_estimate",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.create_estimate
  );
  router.get(
    "/pdf_estimate_details",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.pdf_estimate_details
  );
  router.get(
    "/find_pdf",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.find_pdf
  );
  router.get(
    "/fetch_org_estimate",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.fetch_org_estimate
  );

  app.use("/api/v1/crm/", router);
};
