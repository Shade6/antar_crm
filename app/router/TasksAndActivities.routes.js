
module.exports = app => {
    const TasksAndActivities = require("../controller/TasksAndActivities.controller.js");
       const Authenticator = require("../utils/Authenticator.js");
    var router = require("express").Router();
  

    router.post("/create_basic_attachments",Authenticator.user, TasksAndActivities.createBasicAttachments)
    router.post("/create_basic_comments",Authenticator.user, TasksAndActivities.createBasicComments)
    router.post("/create_basic_notes",Authenticator.user, TasksAndActivities.createBasicNotes)
    router.post("/create_basic_task",Authenticator.user, TasksAndActivities.createBasicTask)

    router.get("/get_all_basic_attachments",Authenticator.user, TasksAndActivities.getAllBasicAttachments);
    router.get("/get_all_basic_comments",Authenticator.user, TasksAndActivities.getAllBasicComments)
    router.get("/get_all_basic_notes",Authenticator.user, TasksAndActivities.getAllBasicNotes)
    router.get("/get_all_basic_task",Authenticator.user, TasksAndActivities.getAllBasicTasks)
  
    router.get("/get_single_basic_attachments",Authenticator.user, TasksAndActivities.getAllBasicAttachments);
    router.get("/get_single_basic_comments",Authenticator.user, TasksAndActivities.getAllBasicComments)
    router.get("/get_single_basic_notes",Authenticator.user, TasksAndActivities.getAllBasicNotes)
    router.get("/get_single_basic_task", Authenticator.user,TasksAndActivities.getAllBasicTasks)

    router.put("/update_basic_attachments",Authenticator.user, TasksAndActivities.updateBasicAttachments)
    router.put("/update_basic_comments", Authenticator.user,TasksAndActivities.updateBasicComments)
    router.put("/update_basic_task",Authenticator.user, TasksAndActivities.updateBasicNotes)
    router.put("/update_basic_notes", Authenticator.user,TasksAndActivities.updateBasicTask)

    router.delete("/delete_basic_attachments", Authenticator.user,TasksAndActivities.deleteBasicAttachments)
    router.delete("/delete_basic_comments", Authenticator.user,TasksAndActivities.deleteBasicComments)
    router.delete("/delete_basic_notes", Authenticator.user,TasksAndActivities.deleteBasicNotes)
    router.delete("/delete_basic_task", Authenticator.user,TasksAndActivities.deleteBasicTask)
  
  
    app.use('/api/v1/crm/', router);
  };
  

  // router.post("/create_TasksAndActivities", TasksAndActivities);
  // router.put("/update_TasksAndActivities", TasksAndActivities);
  // router.get("/get_TasksAndActivities", TasksAndActivities);
  // router.get("/get_all_TasksAndActivities", TasksAndActivities);
  // router.delete("/delete_TasksAndActivities", TasksAndActivities);