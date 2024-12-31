
module.exports = app => {
  const controller = require("../../controller/userAccess/UserController.controller");

  var router = require("express").Router();

  router.post("/create_user", controller.create_user);
  router.put("/update_user", controller.update_user);
  router.get("/get_user", controller.get_user);
  router.get("/get_all_user", controller.find_all_user);
  router.delete("/delete_user", controller.delete_user);



  app.use('/api/', router);
};
