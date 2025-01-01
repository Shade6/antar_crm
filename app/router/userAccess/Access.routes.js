module.exports = app => {
    const controller = require("../../controller/userAccess/AccessManage.controller");
  
    var router = require("express").Router();
  
    router.get("/get_access", controller.get_user_page_access);
    router.get("/menu",controller.get_user_menu)
  
  
    app.use('/api/v1/', router);
  };
  