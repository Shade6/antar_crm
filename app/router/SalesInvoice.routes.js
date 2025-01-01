
module.exports = app => {
    const salesInvoice = require("../controller/SalesInvoice.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create_salesInvoice", salesInvoice);
    router.put("/update_salesInvoice", salesInvoice);
    router.get("/get_salesInvoice", salesInvoice);
    router.get("/get_all_salesInvoice", salesInvoice);
    router.delete("/delete_salesInvoice", salesInvoice);
  
  
  
    app.use('/api/v1/', router);
  };
  