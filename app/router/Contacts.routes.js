
module.exports = app => {
    const contact = require("../../app/controller/Contact.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create_contact", contact);
    router.put("/update_contact", contact);
    router.get("/get_contact", contact);
    router.get("/get_all_contact", contact);
    router.delete("/delete_contact", contact);
  
  
  
    app.use('/api/v1/', router);
  };
  