
module.exports = app => {
    const leads = require("../../app/controller/Contact.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create_leads", leads);
    router.put("/update_leads", leads);
    router.get("/get_leads", leads);
    router.get("/get_all_leads", leads);
    router.delete("/delete_leads", leads);
  
  
  
    app.use('/api/v1/', router);
  };
  