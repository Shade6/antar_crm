module.exports = (app) => {
  const controller = require("../controller/opportunity/Opportunity.controller.js");
  const Authenticator = require("../utils/Authenticator.js");
  const AccessChecker = require("../utils/AccessChecker.js");
  var router = require("express").Router();

  router.post("/create_opportunity", Authenticator.user, AccessChecker.access_create,controller.createDeal);
  router.get("/get_opportunity_by_id", Authenticator.user, AccessChecker.access_create,controller.getOpportunityById);
  router.get("/get_opportunity", Authenticator.user, AccessChecker.access_create,controller.getAllOpportunity);
  router.delete("/delete_opportunity", Authenticator.user, AccessChecker.access_create,controller.deleteDeal);
  app.use("/api/v1/", router);
};
