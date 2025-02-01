module.exports = app => {
    const controller = require("../../controller/userAccess/Dashboard.controller.js");
    const Authenticator = require("../../utils/Authenticator.js")
    const AccessChecker = require('../../utils/AccessChecker.js')
    var router = require("express").Router();
  
    router.get("/find_dashboard",Authenticator.user,AccessChecker.access_create, controller.find_dashboard);

    app.use('/api/v1/', router);
  };
  