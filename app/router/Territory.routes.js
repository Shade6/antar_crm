
module.exports = app => {
    const controller = require("../../app/controller/Territory.controller");
  
    var router = require("express").Router();
  
    router.post("/create_territory", controller.create_territory);
    router.get("/find_all_territories", controller.find_all_territories);
    router.get("/find_one_territory", controller.find_one_territories);
    router.put("/update_territory", controller.update_territory);
    // router.delete("/delete_contact", contact);
    app.use('/api/v1/crm/', router);
  };
  