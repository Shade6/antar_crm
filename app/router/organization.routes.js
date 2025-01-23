module.exports = (app) => {
    const controller = require("../controller/organization/Organization.controller");
    const Authenticator = require("../utils/Authenticator.js");
    const AccessChecker = require("../utils/AccessChecker.js");
    var router = require("express").Router();
  
    router.post("/create_organization", Authenticator.user, AccessChecker.access_create,controller.createOrganization);
    router.get("/get_organization_by_id", Authenticator.user, AccessChecker.access_create,controller.getOrganizationById);
    router.get("/get_organization", Authenticator.user, AccessChecker.access_create,controller.getAllOrganizations);
    router.delete("/delete_organization", Authenticator.user, AccessChecker.access_create,controller.deleteOrganization);
    app.use("/api/v1/", router);
  };
  