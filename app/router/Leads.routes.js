
module.exports = app => {
    const controller = require("../../app/controller/Leads.controller");

      const Authenticator = require("../utils/Authenticator.js")
      const AccessChecker = require('../utils/AccessChecker.js')
    var router = require("express").Router();
  
    router.post("/create_lead",Authenticator.user,AccessChecker.access_create, controller.create_lead);
    router.get("/get_leads",Authenticator.user,AccessChecker.access_read, controller.getLeads)
    router.get("/find_single_lead",Authenticator.user,AccessChecker.access_read,controller.find_single_lead)
    router.get("/find_assignees",Authenticator.user,AccessChecker.access_read,controller.find_assignees)
    router.put("/update_lead_assignee",Authenticator.user,AccessChecker.access_amend,controller.update_lead_assignee)
    
    // router.put("/update_leads", leads);
    // router.get("/get_leads", leads);
    // router.get("/get_all_leads", leads);
    // router.delete("/delete_leads", leads);
  
  
  
    app.use('/api/v1/', router);
  };
  