module.exports = app => {
    const controller = require("../../controller/userAccess/ModulePermission.controller");
    const Authenticator = require("../../utils/Authenticator.js")
    const AccessChecker = require('../../utils/AccessChecker.js')
    var router = require("express").Router();
  
    router.post("/create_module_permission", controller.create_module_permission);
    router.put("/update_docs_permission", controller.update_docs_permission);
    router.get("/get_docs_permission", controller.get_docs_permission);
    router.get("/get_all_module_permission",Authenticator.user,AccessChecker.access_read, controller.find_all_docs_permission);
    router.delete("/delete_docs_permission", controller.delete_docs_permission);
  
  
  
    app.use('/api/v1/', router);
  };
  