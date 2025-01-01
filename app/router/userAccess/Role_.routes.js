
module.exports = app => {
    const controller = require("../../controller/userAccess/Role.controller");
    var router = require("express").Router();
  
    router.post("/create_role", controller.create_role);
    router.put("/update_role", controller.update_role);
    router.get("/get_role", controller.get_role);
    router.get("/get_all_role", controller.find_all_role);
    router.delete("/delete_role", controller.delete_role);
  
  
  
    app.use('/api/v1/', router);
  };
  