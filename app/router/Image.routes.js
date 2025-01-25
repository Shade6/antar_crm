module.exports = app => {
    const multer = require("multer");
    const path = require("path");
  
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        console.log(file, "file destination");
        cb(null, path.join(__dirname, "../../public"));
      },
      filename: function (req, file, cb) {
        console.log(file, "file filename");
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
      },
    });
  
    const upload = multer({ storage: storage });
    const controller = require("../../app/controller/Image.controller");
    const Auth = require("../utils/Authenticator")
    var router = require("express").Router();
  
    router.post("/create_image",Auth.user, upload.single('file'), controller.uploadFile);

    app.use('/api/v1/', router);
  };
  