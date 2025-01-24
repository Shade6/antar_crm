module.exports = (app) => {
    const controller = require("../controller/products/Products.controller.js");
    const Authenticator = require("../utils/Authenticator.js");
    const AccessChecker = require("../utils/AccessChecker.js");
    var router = require("express").Router();

    router.post("/create_product", Authenticator.user, AccessChecker.access_create, controller.createProduct);
    router.get("/get_product_by_id", Authenticator.user, AccessChecker.access_create, controller.getProductById);
    router.get("/get_all_product", Authenticator.user, AccessChecker.access_create, controller.getAllProducts);
    router.delete("/delete_product", Authenticator.user, AccessChecker.access_create, controller.deleteProduct);
    router.put("/update_product", Authenticator.user, AccessChecker.access_create, controller.updateProduct);

    app.use("/api/v1", router);
};

