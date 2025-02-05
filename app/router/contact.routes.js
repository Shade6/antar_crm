module.exports = (app) => {
  const controller = require("../controller/contact/contact.controller");
  const Authenticator = require("../utils/Authenticator.js");
  const AccessChecker = require("../utils/AccessChecker.js");
  const Subscription = require("../utils/Subscription.js")
  var router = require("express").Router();

  router.post(
    "/create_contact",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.createContact
  );
  router.get(
    "/contact_details_by_id",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.contact_details_by_id
  );
  router.get(
    "/get_contacts",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.getContacts
  );
  router.delete(
    "/delete_contact",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.deleteContact
  );
  router.get(
    "/get_contact_by_id",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.get_contact_by_id
  );
  router.put(
    "/update_contact",
    Authenticator.user,
    Subscription.check_subscription,
    AccessChecker.access_create,
    controller.update_contact
  );
  app.use("/api/v1/crm/", router);
};
