module.exports = app => {
    const controller = require("../../controller/userAccess/Dashboard.controller.js");
    const Authenticator = require("../../utils/Authenticator.js")
    const AccessChecker = require('../../utils/AccessChecker.js')
    var router = require("express").Router();
  
    router.get("/find_dashboard",Authenticator.user,controller.find_dashboard);
    router.get("/dashboard_header",Authenticator.user, controller.dashboard_header)
    app.use('/api/v1/crm/', router);
  };
  