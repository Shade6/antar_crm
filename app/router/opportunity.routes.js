module.exports = (app) => {
  const controller = require("../controller/opportunity/Opportunity.controller.js");
  const Authenticator = require("../utils/Authenticator.js");
  const AccessChecker = require("../utils/AccessChecker.js");
  var router = require("express").Router();

  router.post("/create_opportunity", Authenticator.user, AccessChecker.access_create,controller.createDeal);
  router.get("/get_opportunity_by_id", Authenticator.user, AccessChecker.access_create,controller.getOpportunityById);
  router.get("/get_opportunity", Authenticator.user, AccessChecker.access_create,controller.getAllOpportunity);
  router.delete("/delete_opportunity", Authenticator.user, AccessChecker.access_create,controller.deleteDeal);

  router.post("/create_address_contact", Authenticator.user, AccessChecker.access_create, controller.createAddressContact);
  router.post("/create_address_org", Authenticator.user, AccessChecker.access_create, controller.createAddressOrg);
  
  router.get("/get_all_address_contact", Authenticator.user, AccessChecker.access_create, controller.getAllAddressContact);
  router.get("/get_all_address_org", Authenticator.user, AccessChecker.access_create, controller.getAllAddressOrg);
  router.post("/create_extra_contact",Authenticator.user, AccessChecker.access_create, controller.create_extra_contact)
  
  router.get("/find_extra_contacts", Authenticator.user, AccessChecker.access_create, controller.find_extra_contacts);
  router.delete("/handle_remove_extra_contact",Authenticator.user, AccessChecker.access_create, controller.handle_remove_extra_contact)
  app.use("/api/v1/crm/", router);
};
