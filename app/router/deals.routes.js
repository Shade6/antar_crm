module.exports = (app) => {
  const controller = require("../controller/deals/Deals.controller.js");
  const Authenticator = require("../utils/Authenticator.js");
  const AccessChecker = require("../utils/AccessChecker.js");
  var router = require("express").Router();

  router.post("/create_deal", Authenticator.user, AccessChecker.access_create,controller.createDeal);

  router.get("/get_deals", Authenticator.user, AccessChecker.access_create,controller.getAllDealsByAssignee);
  router.delete("/delete_deal", Authenticator.user, AccessChecker.access_create,controller.deleteDeal);
  app.use("/api/v1/", router);
};
