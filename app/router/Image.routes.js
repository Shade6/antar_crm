

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
  
const upload = multer({
      storage: storage,
      fileFilter: function (req, file, cb) {
        // Allow only images and PDFs
        const fileTypes = /jpeg|jpg|png|pdf/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
    
        if (extName && mimeType) {
          return cb(null, true);
        } else {
          return cb(new Error("Only images and PDFs are allowed!"));
        }
      },
    });
    const controller = require("../../app/controller/Image.controller");
    const Auth = require("../utils/Authenticator")
    var router = require("express").Router();
  
    router.post("/create_image",Auth.user, upload.single('file'), controller.uploadFile);
    router.post("/create_file_pdf",Auth.user, upload.single('file'), controller.uploadPDF)
    app.use('/api/v1/', router);
  };
  