const AWS = require("aws-sdk"); // Import AWS SDK
const fs = require("fs"); // Import File System module
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
