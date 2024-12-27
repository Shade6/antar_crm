
module.exports = app => {
  const product = require("../../app/controller/UserController.controller.js");

  var router = require("express").Router();

  router.post("/create_user", product.create_user);
  router.put("/update_user", product.create_user);
  router.get("/get_user", product.create_user);
  router.delete("/delete_user", product.create_user);



  app.use('/api/', router);
};
