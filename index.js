const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path')
require("dotenv").config();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
      origin: ["http://localhost:5173","http://localhost:3000"],
      credentials: true,
    })
  );

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  app.use(express.urlencoded({ extended: true }));

// const publicFolderPath = path.join(__dirname, 'public');
app.use('/image',express.static('public'))


  const db = require("./app/models");
  db.sequelize
  .sync()
  .then(() => {console.log("DB connected successfully.")})
  .catch((err) => {
    console.log("Failed to connect db: " + err.message);
  });

 const ActivityLog = require('./app/middleware/ActivityLogs.js');
  app.use(ActivityLog);
app.options("*", cors());

app.get('/',(req,res)=>{
    return res.json({message:'welcome to antar_crm',statusCode:200})
})
require("./app/router/userAccess/User.routes")(app);
require("./app/router/userAccess/Access.routes")(app);
require("./app/router/userAccess/ModulePermisson_.routes")(app)
require("./app/router/userAccess/Module_.routes")(app)
require("./app/router/userAccess/Role_.routes")(app)
require("./app/router/Industry.routes")(app)
require("./app/router/Territory.routes")(app)
require("./app/router/Leads.routes")(app)
require("./app/router/opportunity.routes.js")(app)
require("./app/router/organization.routes")(app)
require("./app/router/contact.routes")(app)
require("./app/router/userAccess/address.routes")(app)
require("./app/router/products.routes")(app)
require("./app/router/Image.routes")(app)
require("./app/router/userAccess/Dashboard.routes.js")(app)
require("./app/router/subscription/subscription.routes.js")(app)

require("./app/router/Superset.routes.js")(app)

const PORT =  8088;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

