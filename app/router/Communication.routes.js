
module.exports = app => {
    const communication = require("../../app/controller/Communication.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create_user", communication);
    router.put("/update_user", communication);
    router.get("/get_user", communication);
    router.delete("/delete_user", communication);
  
  
  
    app.use('/api/v1/', router);
  };
  