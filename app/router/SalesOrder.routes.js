
module.exports = app => {
    const salesOrder = require("../controller/SalesOrder.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create_salesOrder", salesOrder);
    router.put("/update_salesOrder", salesOrder);
    router.get("/get_salesOrder", salesOrder);
    router.get("/get_all_salesOrder", salesOrder);
    router.delete("/delete_salesOrder", salesOrder);
  
  
  
    app.use('/api/', router);
  };
  