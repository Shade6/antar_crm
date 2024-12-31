module.exports = app => {
    const controller = require("../../controller/userAccess/Docs.controller");
  
    var router = require("express").Router();
  
    router.post("/create_docs", controller.create_docs);
    router.put("/update_docs", controller.update_docs);
    router.get("/get_docs", controller.get_docs);
    router.get("/get_all_docs", controller.find_all_docs);
    router.delete("/delete_docs", controller.delete_docs);
  
  
  
    app.use('/api/', router);
  };
  