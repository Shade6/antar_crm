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


db.users = require("./Users.model.js")(sequelize, Sequelize);
db.communication = require("./Communication.model.js")(sequelize, Sequelize);
db.contacts = require("./Contacts.model.js")(sequelize, Sequelize);
db.customers = require("./Customers.model.js")(sequelize, Sequelize);
db.leads = require("./Leads.model.js")(sequelize, Sequelize);
db.notes = require("./Notes.model.js")(sequelize, Sequelize);
db.opportunities = require("./Opportunities.model.js")(sequelize, Sequelize);
db.salesInvoices = require("./SalesInvoices.model.js")(sequelize, Sequelize);
db.salesOrders = require("./SalesOrders.model.js")(sequelize, Sequelize);
db.tasksAndActivities = require("./TasksAndActivities.model.js")(sequelize, Sequelize);



module.exports = db;