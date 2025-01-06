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
db.role = require("./users/Roles.model.js")(sequelize,Sequelize)
db.module_permission = require("./users/ModulePermissions.model.js")(sequelize,Sequelize)



db.communication = require("./communication/Communication.model.js")(sequelize, Sequelize);
db.contacts = require("./contact/Contacts.model.js")(sequelize, Sequelize);
db.customers = require("./customer/Customers.model.js")(sequelize, Sequelize);
db.leads = require("./leads/Leads.model.js")(sequelize, Sequelize);
db.notes = require("./notes/Notes.model.js")(sequelize, Sequelize);
db.opportunities = require("./opportunity/Opportunities.model.js")(sequelize, Sequelize);
db.salesInvoices = require("./salesinvoice/SalesInvoices.model.js")(sequelize, Sequelize);
db.salesOrders = require("./salesorder/SalesOrders.model.js")(sequelize, Sequelize);
db.tasksAndActivities = require("./taskactivity/TasksAndActivities.model.js")(sequelize, Sequelize);


db.lead_assignee = require("./leads/LeadAssignee.js")(sequelize,Sequelize)
db.user_group = require("./leads/UserGroup.js")(sequelize,Sequelize)
db.user_group_details = require("./leads/UserGroupDetails.js")(sequelize,Sequelize)
db.activity_log = require("./ActivityLog.js")(sequelize,Sequelize)
db.industry = require("./leads/Industry.js")(sequelize,Sequelize)
db.territory = require("./leads/Territory.js")(sequelize,Sequelize)

//-------------------------------------------------------------------------------------------
db.module.hasMany(db.module_permission, { //---this is the reference 
  foreignKey: 'module_id',
  as: 'permissions'      
});
db.module_permission.belongsTo(db.module, { //---this is the original table
  foreignKey: 'module_id', 
  targetKey: 'module_id',         
  as: 'module'             
});
db.role.hasMany(db.module_permission, { //---this is the reference 
  foreignKey: 'role_id',
  as: 'permissions'      
});
db.module_permission.belongsTo(db.role, { //---this is the original table
  foreignKey: 'role_id', 
  targetKey: 'role_id',         
  as: 'role'             
});



//-------------------------------------------------------------------------------------------
db.role.hasMany(db.users, { //---this is the reference 
  foreignKey: 'role_id',
  as: 'module'      
});
db.users.belongsTo(db.role, { //---this is the original table
  foreignKey: 'role_id', 
  targetKey: 'role_id',         
  as: 'role'             
});


module.exports = db;