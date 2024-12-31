module.exports = app => {
    const controller = require("../../controller/userAccess/DocsPermission.controller");
  
    var router = require("express").Router();
  
    router.post("/create_docs_permission", controller.create_docs_permission);
    router.put("/update_docs_permission", controller.update_docs_permission);
    router.get("/get_docs_permission", controller.get_docs_permission);
    router.get("/get_all_docs_permission", controller.find_all_docs_permission);
    router.delete("/delete_docs_permission", controller.delete_docs_permission);
  
  
  
    app.use('/api/', router);
  };
  