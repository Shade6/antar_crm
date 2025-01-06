
module.exports = app => {
    const controller = require("../../app/controller/Leads.controller");
  
    var router = require("express").Router();
  
    router.post("/create_lead", controller.create_lead);
    router.get("/get_leads",controller.getLeads)
    // router.put("/update_leads", leads);
    // router.get("/get_leads", leads);
    // router.get("/get_all_leads", leads);
    // router.delete("/delete_leads", leads);
  
  
  
    app.use('/api/v1/', router);
  };
  