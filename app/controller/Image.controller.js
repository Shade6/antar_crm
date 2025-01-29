const AWS = require("aws-sdk"); // Import AWS SDK
const fs = require("fs"); // Import File System module
const db = require('../models')
const Opportunities = db.opportunity
const Estimate = db.estimate
exports.uploadFile = async (req, res) => {
  console.log(req.file);
  const fileData = req.file;
  if (!fileData) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const folderName = "products";
  const fileName = fileData.originalname;
  console.log(
    process.env.AWS_ACCESS_KEY_ID,"this is the access key id",
    process.env.AWS_SECRET_ACCESS_KEY,"this is the secret access key",
    process.env.AWS_REGION,"this is the region"
  );
  // Configure AWS SDK
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  // Create S3 instance
  const s3 = new AWS.S3();

  // Function to upload image to S3 bucket
  // function uploadImageToS3() {
  const bucketName = process.env.AWS_BUCKET_NAME;
  // const keyName = fileName;
  const keyName = `tenant_id`;
  // Read image file
  const fileContent = fs.readFileSync(fileData.path);

  // Setting up S3 upload parameters
  const params = {
    Bucket: bucketName,
    ACL: "public-read",
    Metadata: {
      ContentDisposition: "inline",
    },
    ContentType: "image/png",
    Key: `${keyName}/${fileName}`,
    Body: fileContent,
  };

  s3.upload(params, async function (err, data) {
    if (err) {
      console.error("Error uploading image to S3:", err);
    } else {
      console.log("Image uploaded successfully. S3 location:", data.Location);
      fs.unlinkSync(fileData.path);
      data = {
        product_id: req.body.product_id,
        file: data.Location,
        filename: req.file.originalname,
        altname: req.body.altname ? req.body.altname : "",
      };
      // file = await Upload.create(data);
      // Send response with uploaded image URL
      return res.json({
        data: data,
        message: "Files uploaded succesfully",
        statusCode: 200,
      });
    }
  });
};


exports.uploadPDF = async (req, res) => {
  console.log(req.file);
  const fileData = req.file;
  const opportunity_id = req.query.id
  const estimate_id = req.query.estimate_id
  if (!fileData) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const folderName = "pdfs"; // Folder name in S3
  const fileName = fileData.originalname;

  // Configure AWS SDK
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  // Create S3 instance
  const s3 = new AWS.S3();

  // Read the PDF file
  const fileContent = fs.readFileSync(fileData.path);

  // S3 upload parameters
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    ACL: "public-read",
    ContentType: "application/pdf",
    Key: `${folderName}/${Date.now()}-${fileName}`, // Store in the "pdfs" folder
    Body: fileContent,
  };

  s3.upload(params, async function (err, data) {
    if (err) {
      console.error("Error uploading PDF to S3:", err);
      return res.status(500).json({ error: "Failed to upload PDF" });
    } else {
      console.log("PDF uploaded successfully. S3 location:", data.Location);
      fs.unlinkSync(fileData.path); // Delete temp file
      await Opportunities.update({pdf:data.Location},{where:{opportunity_id:opportunity_id}})
      await Estimate.update({pdf:data.Location},{where:{estimate_id:estimate_id}})
      return res.json({
        fileUrl: data.Location,
        message: "PDF uploaded successfully",
        statusCode: 200,
      });
    }
  });
};