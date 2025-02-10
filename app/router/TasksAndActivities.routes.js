
module.exports = app => {
    const TasksAndActivities = require("../controller/TasksAndActivities.controller.js");
  
    var router = require("express").Router();
  

    router.post("/create_basic_attachments", TasksAndActivities.createBasicAttachments)
    router.post("/create_basic_comments", TasksAndActivities.createBasicComments)
    router.post("/create_basic_notes", TasksAndActivities.createBasicNotes)
    router.post("/create_basic_task", TasksAndActivities.createBasicTask)

    router.get("/get_all_basic_attachments", TasksAndActivities.getAllBasicAttachments);
    router.get("/get_all_basic_comments", TasksAndActivities.getAllBasicComments)
    router.get("/get_all_basic_notes", TasksAndActivities.getAllBasicNotes)
    router.get("/get_all_basic_task", TasksAndActivities.getAllBasicTasks)
  

    router.put("/update_basic_attachments", TasksAndActivities.updateBasicAttachments)
    router.put("/update_basic_comments", TasksAndActivities.updateBasicComments)
    router.put("/update_basic_task", TasksAndActivities.updateBasicNotes)
    router.put("/update_basic_notes", TasksAndActivities.updateBasicTask)

    router.delete("/delete_basic_attachments", TasksAndActivities.deleteBasicAttachments)
    router.delete("/delete_basic_comments", TasksAndActivities.deleteBasicComments)
    router.delete("/delete_basic_notes", TasksAndActivities.deleteBasicNotes)
    router.delete("/delete_basic_task", TasksAndActivities.deleteBasicTask)
  
  
    app.use('/api/v1/crm/', router);
  };
  

  // router.post("/create_TasksAndActivities", TasksAndActivities);
  // router.put("/update_TasksAndActivities", TasksAndActivities);
  // router.get("/get_TasksAndActivities", TasksAndActivities);
  // router.get("/get_all_TasksAndActivities", TasksAndActivities);
  // router.delete("/delete_TasksAndActivities", TasksAndActivities);