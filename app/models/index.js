const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false,
  },
});

const db = {};



db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.users = require("./users/Users.model.js")(sequelize, Sequelize);
db.module = require("./users/Module.model.js")(sequelize,Sequelize)
db.docs = require("./users/Docs_.model.js")(sequelize,Sequelize)
db.role = require("./users/Roles.model.js")(sequelize,Sequelize)
db.docs_perm = require("./users/DocsPermissions.model.js")(sequelize,Sequelize)



db.communication = require("./communication/Communication.model.js")(sequelize, Sequelize);
db.contacts = require("./contact/Contacts.model.js")(sequelize, Sequelize);
db.customers = require("./customer/Customers.model.js")(sequelize, Sequelize);
db.leads = require("./leads/Leads.model.js")(sequelize, Sequelize);
db.notes = require("./notes/Notes.model.js")(sequelize, Sequelize);
db.opportunities = require("./opportunity/Opportunities.model.js")(sequelize, Sequelize);
db.salesInvoices = require("./salesinvoice/SalesInvoices.model.js")(sequelize, Sequelize);
db.salesOrders = require("./salesorder/SalesOrders.model.js")(sequelize, Sequelize);
db.tasksAndActivities = require("./taskactivity/TasksAndActivities.model.js")(sequelize, Sequelize);



module.exports = db;