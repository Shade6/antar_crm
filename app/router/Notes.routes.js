
module.exports = app => {
    const notes = require("../../app/controller/Notes.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create_notes", notes);
    router.put("/update_notes", notes);
    router.get("/get_notes", notes);
    router.get("/get_all_notes", notes);
    router.delete("/delete_notes", notes);
  
  
  
    app.use('/api/v1/crm/', router);
  };
  