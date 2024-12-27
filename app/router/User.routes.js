
module.exports = app => {
  const product = require("../../app/controller/UserController.controller.js");

  var router = require("express").Router();

  router.get("/create_user", product.create_user);
  app.use('/api/', router);
};
