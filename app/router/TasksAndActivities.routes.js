
module.exports = app => {
    const TasksAndActivities = require("../controller/TasksAndActivities.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create_TasksAndActivities", TasksAndActivities);
    router.put("/update_TasksAndActivities", TasksAndActivities);
    router.get("/get_TasksAndActivities", TasksAndActivities);
    router.get("/get_all_TasksAndActivities", TasksAndActivities);
    router.delete("/delete_TasksAndActivities", TasksAndActivities);
  
  
  
    app.use('/api/v1/', router);
  };
  