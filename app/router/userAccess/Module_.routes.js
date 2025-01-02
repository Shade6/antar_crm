module.exports = app => {
    const controller = require("../../controller/userAccess/Module.controller");
    const Authenticator = require("../../utils/Authenticator.js")
    const AccessChecker = require('../../utils/AccessChecker.js')
    var router = require("express").Router();
  
    router.post("/create_module", Authenticator.user ,AccessChecker.access_create, controller.create_module);
    router.put("/update_module", controller.update_module);
    router.get("/get_module", controller.get_module);
    router.get("/get_all_module", Authenticator.user ,AccessChecker.access_read, controller.find_all_module);
    router.delete("/delete_module", controller.delete_module);
  
  
  
    app.use('/api/v1/', router);
  };
  