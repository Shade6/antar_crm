
module.exports = app => {
  const controller = require("../../controller/userAccess/UserController.controller");
  const Authenticator = require("../../utils/Authenticator.js")
  const AccessChecker = require('../../utils/AccessChecker.js')
  var router = require("express").Router();

  router.post("/create_user", controller.create_user);
  router.post("/login",controller.login)
  router.put("/update_user", controller.update_user);
  router.get("/findUserById", controller.get_user);
  router.get("/get_all_user",Authenticator.user,AccessChecker.access_read, controller.find_all_user);
  router.delete("/delete_user", controller.delete_user);



  app.use('/api/v1/crm/', router);
};
