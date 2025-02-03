
module.exports = app => {
    const consumer = require("../../app/controller/Contact.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create_consumer", consumer);
    router.put("/update_consumer", consumer);
    router.get("/get_consumer", consumer);
    router.get("/get_all_consumer", consumer);
    router.delete("/delete_consumer", consumer);
  
  
  
    app.use('/api/v1/crm/', router);
  };
  