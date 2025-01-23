module.exports = (app) => {
  const controller = require("../controller/contact/contact.controller");
  const Authenticator = require("../utils/Authenticator.js");
  const AccessChecker = require("../utils/AccessChecker.js");
  var router = require("express").Router();

  router.post("/create_contact", Authenticator.user, AccessChecker.access_create,controller.createContact);
  router.get("/contact_details_by_id", Authenticator.user, AccessChecker.access_create,controller.contact_details_by_id);
  router.get("/get_contacts", Authenticator.user, AccessChecker.access_create,controller.getContacts);
   router.delete("/delete_contact", Authenticator.user, AccessChecker.access_create,controller.deleteContact);
    app.use("/api/v1/", router);
  };
  