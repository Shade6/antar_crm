module.exports = app => {
    const controller = require("../../controller/userAccess/Module.controller");
  
    var router = require("express").Router();
  
    router.post("/create_module", controller.create_module);
    router.put("/update_module", controller.update_module);
    router.get("/get_module", controller.get_module);
    router.get("/get_all_module", controller.find_all_module);
    router.delete("/delete_module", controller.delete_module);
  
  
  
    app.use('/api/', router);
  };
  