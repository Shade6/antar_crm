
module.exports = app => {
    const controller = require("../../app/controller/Industry.controller");
  
    var router = require("express").Router();
  
    router.post("/create_industry", controller.create_industry);
    router.get("/find_all_industry", controller.find_all_industries);
    // router.get("/get_contact", contact);
    // router.get("/get_all_contact", contact);
    // router.delete("/delete_contact", contact);
  
  
  
    app.use('/api/v1/', router);
  };
  