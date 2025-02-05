module.exports = app => {
    const controller = require("../../controller/userAccess/UserController.controller");
    const {user} = require("../../utils/Authenticator")
     
    var router = require("express").Router();
  
     router.get("/get_address", user,controller.get_user_address);
     router.post("/create_address",user, controller.create_user_address);
  
  
  
    app.use('/api/v1/crm/', router);
  };
  