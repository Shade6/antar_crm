
module.exports = app => {
    const controller = require("../controller/leads/Leads.controller.js");
    const attachment_controller = require("../controller/leads/Attachment.controller.js")
    const comment_controller =  require("../controller/leads/Comment.controller.js")
    const note_controller =  require("../controller/leads/Notes.controller.js")
    const task_controller =  require("../controller/leads/Task.controller.js")



      const Authenticator = require("../utils/Authenticator.js")
      const AccessChecker = require('../utils/AccessChecker.js')
    var router = require("express").Router();
  
    router.post("/create_lead",Authenticator.user,AccessChecker.access_create, controller.create_lead);
    router.get("/get_leads",Authenticator.user,AccessChecker.access_read, controller.getLeads)
    router.get("/find_single_lead",Authenticator.user,AccessChecker.access_read,controller.find_single_lead)
    router.get("/find_assignees",Authenticator.user,AccessChecker.access_read,controller.find_assignees)
    router.put("/update_lead_assignee",Authenticator.user,AccessChecker.access_amend,controller.update_lead_assignee)
    
  
   router.post("/create_lead_attachment",Authenticator.user,AccessChecker.access_create,attachment_controller.create)
   router.get("/get_attachment_by_lead_id",Authenticator.user,AccessChecker.access_read,attachment_controller.get_by_lead_id)

   router.post("/create_lead_comment",Authenticator.user,AccessChecker.access_create,comment_controller.create)
   router.get("/get_lead_comment_by_lead_id",Authenticator.user,AccessChecker.access_read,comment_controller.get_by_lead_id)

   router.post("/create_lead_note_attachment",Authenticator.user,AccessChecker.access_create,note_controller.create)
   router.get("/get_lead_note_by_lead_id",Authenticator.user,AccessChecker.access_read,note_controller.get_by_lead_id)

   router.post("/create_lead_task",Authenticator.user,AccessChecker.access_create,task_controller.create)
   router.get("/get_lead_task_by_lead_id",Authenticator.user,AccessChecker.access_read,task_controller.get_by_lead_id)
  

   router.post("/create_lead_scoring_rules",Authenticator.user,AccessChecker.access_create,controller.create_lead_scoring_rules)
   router.get("/get_lead_scoring_rules",Authenticator.user,AccessChecker.access_read,controller.get_lead_scoring_rules)
   
   app.use('/api/v1/', router);
  };
  