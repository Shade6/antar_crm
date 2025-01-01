const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
      origin: ["http://localhost:5173"],
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


  const db = require("./app/models");
  db.sequelize
  .sync()
  .then(() => {
    console.log(
      "----------------------DB connected successfully.-------------------------"
    );
  })
  .catch((err) => {
    console.log("Failed to connect db: " + err.message);
  });


app.options("*", cors());

app.get('/',(req,res)=>{
    return res.json({message:'welcome to antar_crm',statusCode:200})
})
require("./app/router/userAccess/User.routes")(app);
require("./app/router/userAccess/Access.routes")(app);

require("./app/router/userAccess/ModulePermisson_.routes")(app)
require("./app/router/userAccess/Module_.routes")(app)
require("./app/router/userAccess/Role_.routes")(app)


const PORT =  8088;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
