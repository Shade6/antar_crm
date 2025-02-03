
module.exports = app => {
    const oppertunities = require("../controller/Oppertunities.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create_oppertunities", oppertunities);
    router.put("/update_oppertunities", oppertunities);
    router.get("/get_oppertunities", oppertunities);
    router.get("/get_all_oppertunities", oppertunities);
    router.delete("/delete_oppertunities", oppertunities);
  
  
  
    app.use('/api/v1/crm/', router);
  };
  