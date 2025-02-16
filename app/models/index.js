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


db.activity_log_tracker = require("./LogTracker.js")(sequelize,Sequelize)
db.users = require("./users/Users.model.js")(sequelize, Sequelize);
db.module = require("./users/Module.model.js")(sequelize,Sequelize)
db.role = require("./users/Roles.model.js")(sequelize,Sequelize)
db.module_permission = require("./users/ModulePermissions.model.js")(sequelize,Sequelize)



db.communication = require("./communication/Communication.model.js")(sequelize, Sequelize);
db.contacts = require("./Contacts.model.js")(sequelize, Sequelize);
db.customers = require("./customer/Customers.model.js")(sequelize, Sequelize);
db.leads = require("./leads/Leads.model.js")(sequelize, Sequelize);
// db.notes = require("./notes/Notes.model.js")(sequelize, Sequelize);
db.salesInvoices = require("./salesinvoice/SalesInvoices.model.js")(sequelize, Sequelize);
db.salesOrders = require("./salesorder/SalesOrders.model.js")(sequelize, Sequelize);
// db.tasksAndActivities = require("./taskactivity/TasksAndActivities.model.js")(sequelize, Sequelize);


db.lead_assignee = require("./leads/LeadAssignee.js")(sequelize,Sequelize)
db.user_group = require("./leads/UserGroup.js")(sequelize,Sequelize)
db.user_group_details = require("./leads/UserGroupDetails.js")(sequelize,Sequelize)
db.activity_log = require("./ActivityLog.js")(sequelize,Sequelize)
db.industry = require("./leads/Industry.js")(sequelize,Sequelize)
db.territory = require("./leads/Territory.js")(sequelize,Sequelize)
db.emails = require("./users/Email.model.js")(sequelize,Sequelize)

db.lead_task = require("./leads/LeadTask.model.js")(sequelize,Sequelize)
db.lead_note = require("./leads/LeadNote.model.js")(sequelize,Sequelize)
db.lead_comment = require("./leads/LeadComment.model.js")(sequelize,Sequelize)
db.lead_attachment = require("./leads/LeadAttachments.model.js")(sequelize,Sequelize)


db.user_email = require("./users/UserEmail.model.js")(sequelize,Sequelize)
db.contact_email = require("./opportunity/ContactEmail.js")(sequelize,Sequelize)
// db.deal_status = require("./opportunity/DealStatus.js")(sequelize,Sequelize)
db.organization = require("./Organization.js")(sequelize,Sequelize)
db.currency = require("./opportunity/Currency.js")(sequelize,Sequelize) 
db.opportunity = require("./opportunity/Opportunities.js")(sequelize,Sequelize)
db.contact_phone = require("./opportunity/ContactPhone.js")(sequelize,Sequelize)
db.country = require("./opportunity/Country.js")(sequelize,Sequelize)
db.address = require("./users/Address.model.js")(sequelize,Sequelize)
db.lead_score = require("./leads/LeadScore.js")(sequelize,Sequelize)

db.address_contact = require("./opportunity/AddressContact.js")(sequelize,Sequelize)
db.address_org = require("./opportunity/AddressOrg.js")(sequelize,Sequelize)
db.product = require("./Product.js")(sequelize,Sequelize)
db.contact_mapping = require('./opportunity/ContactMapping.js')(sequelize,Sequelize)
db.estimate = require("./opportunity/Estimate.js")(sequelize,Sequelize)
db.estimate_type = require("./opportunity/EstimateItem.js")(sequelize,Sequelize)
db.product_mapping= require("./ProductMapping.js")(sequelize,Sequelize)

db.invoice = require('./subscription/invoice.js')(sequelize,Sequelize)
db.payment = require('./subscription/payment.js')(sequelize,Sequelize)
db.plan = require('./subscription/plan.js')(sequelize,Sequelize)
db.subscription = require('./subscription/subscription.js')(sequelize,Sequelize)
db.tenant= require('./subscription/tenant.js')(sequelize,Sequelize)


db.note = require("./taskActivity/NoteDetails.js")(sequelize,Sequelize)
db.task = require('./taskActivity/TaskDetails.js')(sequelize,Sequelize)
db.comment = require('./taskActivity/CommentsDetails.js')(sequelize,Sequelize)
db.attachment = require('./taskActivity/AttachmentsDetails.js')(sequelize,Sequelize)


db.call_campaign_analytics = require("./campaign/CallCampaignAnalytics.js")(sequelize,Sequelize)
db.campaign = require("./campaign/Campaign.js")(sequelize,Sequelize)
db.campaign_list = require("./campaign/CampaignList.js")(sequelize,Sequelize)
db.campaign_list_members = require("./campaign/CampaignListMembers.js")(sequelize,Sequelize)
db.email_campaign_analytics = require("./campaign/EmailCampaignAnalytics.js")(sequelize,Sequelize)
db.whatsapp_campaign_analytics = require("./campaign/WhatsappCampaignAnalytics.js")(sequelize,Sequelize)
db.campaign_email = require("./campaign/CampaignEmail.js")(sequelize,Sequelize)


//-------------------
db.industry.hasMany(db.contacts, { //---this is the reference 
  foreignKey: 'industry_id',
  as: 'contact'      
});
db.contacts.belongsTo(db.industry, { //---this is the original table
  foreignKey: 'industry_id', 
  targetKey: 'industry_id',         
  as: 'industry' // Changed alias to avoid naming collision
});
//-------------------
db.users.hasMany(db.campaign_list, { //---this is the reference 
  foreignKey: 'user_id',
  as: 'users'      
});
db.campaign_list.belongsTo(db.users, { //---this is the original table
  foreignKey: 'user_id', 
  targetKey: 'user_id',         
  as: 'user' // Changed alias to avoid naming collision
});

//-------------------
db.organization.hasMany(db.estimate, { //---this is the reference 
  foreignKey: 'organization_id',
  as: 'estimate'      
});
db.estimate.belongsTo(db.organization, { //---this is the original table
  foreignKey: 'organization_id', 
  targetKey: 'organization_id',         
  as: 'organization' // Changed alias to avoid naming collision
});
//-------------------
db.product.hasMany(db.estimate_type, { //---this is the reference 
  foreignKey: 'product_id',
  as: 'estimate_type'      
});
db.estimate_type.belongsTo(db.product, { //---this is the original table
  foreignKey: 'product_id', 
  targetKey: 'product_id',         
  as: 'product' // Changed alias to avoid naming collision
});
//----------------------------------
//-------------------
db.product.hasMany(db.product_mapping, { //---this is the reference 
  foreignKey: 'product_id',
  as: 'product'      
});
db.product_mapping.belongsTo(db.product, { //---this is the original table
  foreignKey: 'product_id', 
  targetKey: 'product_id',         
  as: 'product' // Changed alias to avoid naming collision
});
//----------------------------------
db.opportunity.hasMany(db.product, { //---this is the reference 
  foreignKey: 'opportunity_id',
  as: 'opportunity'      
});
db.product.belongsTo(db.opportunity, { //---this is the original table
  foreignKey: 'opportunity_id', 
  targetKey: 'opportunity_id',         
  as: 'opportunity' // Changed alias to avoid naming collision
});


//---------------------
db.contacts.hasMany(db.contact_mapping, { //---this is the reference 
  foreignKey: 'contact_id',
  as: 'contacts'      
});
db.contact_mapping.belongsTo(db.contacts, { //---this is the original table
  foreignKey: 'contact_id', 
  targetKey: 'contact_id',         
  as: 'contact' // Changed alias to avoid naming collision
});
db.opportunity.hasMany(db.contact_mapping, { //---this is the reference 
  foreignKey: 'opportunity_id',
  as: 'contact_map'      
});
db.contact_mapping.belongsTo(db.opportunity, { //---this is the original table
  foreignKey: 'opportunity_id', 
  targetKey: 'opportunity_id',         
  as: 'opportunity' // Changed alias to avoid naming collision
});
//------------------------------------
db.address_contact.hasMany(db.contacts, { //---this is the reference 
  foreignKey: 'address_contact_id',
  as: 'contacts'      
});
db.contacts.belongsTo(db.address_contact, { //---this is the original table
  foreignKey: 'address_contact_id', 
  targetKey: 'address_contact_id',         
  as: 'address_contact' // Changed alias to avoid naming collision
});

// ------------------------------------------------------------

db.industry.hasMany(db.organization, { //---this is the reference 
  foreignKey: 'industry_id',
  as: 'organization'      
});
db.organization.belongsTo(db.industry, { //---this is the original table
  foreignKey: 'industry_id', 
  targetKey: 'industry_id',         
  as: 'industry'             
});
db.territory.hasMany(db.organization, { //---this is the reference 
  foreignKey: 'territory_id',
  as: 'organization'      
});
db.organization.belongsTo(db.territory, { //---this is the original table
  foreignKey: 'territory_id', 
  targetKey: 'territory_id',         
  as: 'territory'             
});

db.address.hasMany(db.organization, { //---this is the reference 
  foreignKey: 'address_id',
  as: 'organization'      
});
db.organization.belongsTo(db.address, { //---this is the original table
  foreignKey: 'address_id', 
  targetKey: 'address_id',         
  as: 'address_contact' // Changed alias to avoid naming collision
});

//-----------------------------------------------------
db.contacts.hasMany(db.opportunity, { //---this is the reference 
  foreignKey: 'contact_id',
  as: 'deal'      
});
db.opportunity.belongsTo(db.contacts, { //---this is the original table
  foreignKey: 'contact_id', 
  targetKey: 'contact_id',         
  as: 'contact'             
});
db.organization.hasMany(db.opportunity, { //---this is the reference 
  foreignKey: 'organization_id',
  as: 'deal'      
});
db.opportunity.belongsTo(db.organization, { //---this is the original table
  foreignKey: 'organization_id', 
  targetKey: 'organization_id',         
  as: 'organization'             
});
db.users.hasMany(db.opportunity, { //---this is the reference 
  foreignKey: 'deal_owner_id',
  as: 'deal'      
});
db.opportunity.belongsTo(db.users, { //---this is the original table
  foreignKey: 'deal_owner_id', 
  targetKey: 'user_id',         
  as: 'deal_owner'             
});
//-----------------------------------------------------

//-------------------------------------------------------------------------------------------
db.users.hasMany(db.task, { //---this is the reference 
  foreignKey: 'user_id',
  as: 'task'      
});
db.task.belongsTo(db.users, { //---this is the original table
  foreignKey: 'user_id', 
  targetKey: 'user_id',         
  as: 'user'             
});
db.leads.hasMany(db.task, { //---this is the reference 
  foreignKey: 'lead_id',
  as: 'task'      
});
db.task.belongsTo(db.leads, { //---this is the original table
  foreignKey: 'lead_id', 
  targetKey: 'lead_id',         
  as: 'lead'             
});
//-------------------------------------------------------------------------------------------
db.users.hasMany(db.note, { //---this is the reference 
  foreignKey: 'user_id',
  as: 'note'      
});
db.note.belongsTo(db.users, { //---this is the original table
  foreignKey: 'user_id', 
  targetKey: 'user_id',         
  as: 'user'             
});
db.leads.hasMany(db.note, { //---this is the reference 
  foreignKey: 'lead_id',
  as: 'note'      
});
db.note.belongsTo(db.leads, { //---this is the original table
  foreignKey: 'lead_id', 
  targetKey: 'lead_id',         
  as: 'lead'             
});
//-------------------------------------------------------------------------------------------
db.users.hasMany(db.comment, { //---this is the reference 
  foreignKey: 'user_id',
  as: 'comment'      
});
db.comment.belongsTo(db.users, { //---this is the original table
  foreignKey: 'user_id', 
  targetKey: 'user_id',         
  as: 'user'             
});
db.leads.hasMany(db.comment, { //---this is the reference 
  foreignKey: 'lead_id',
  as: 'comment'      
});
db.comment.belongsTo(db.leads, { //---this is the original table
  foreignKey: 'lead_id', 
  targetKey: 'lead_id',         
  as: 'lead'             
});
//-------------------------------------------------------------------------------------------
db.users.hasMany(db.attachment, { //---this is the reference 
  foreignKey: 'user_id',
  as: 'attachment'      
});
db.attachment.belongsTo(db.users, { //---this is the original table
  foreignKey: 'user_id', 
  targetKey: 'user_id',         
  as: 'user'             
});
db.leads.hasMany(db.attachment, { //---this is the reference 
  foreignKey: 'lead_id',
  as: 'attachment'      
});
db.attachment.belongsTo(db.leads, { //---this is the original table
  foreignKey: 'lead_id', 
  targetKey: 'lead_id',         
  as: 'lead'             
});

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

//-----------------------------------------------------------------------------------------

db.industry.hasMany(db.leads, { //---this is the reference 
  foreignKey: 'industry_id',
  as: 'leads'      
});
db.leads.belongsTo(db.industry, { //---this is the original table
  foreignKey: 'industry_id', 
  targetKey: 'industry_id',         
  as: 'industry'             
});

db.territory.hasMany(db.leads, { //---this is the reference 
  foreignKey: 'territory_id',
  as: 'leads'      
});
db.leads.belongsTo(db.territory, { //---this is the original table
  foreignKey: 'territory_id', 
  targetKey: 'territory_id',         
  as: 'territory'             
});
db.users.hasMany(db.leads, { //---this is the reference 
  foreignKey: 'assigned_to',
  as: 'leads'      
});
db.leads.belongsTo(db.users, { //---this is the original table
  foreignKey: 'assigned_to', 
  targetKey: 'user_id',         
  as: 'assignee'             
});

//----------------------------------------------------------------------------

db.users.hasMany(db.lead_assignee, {
  foreignKey: 'user_id',
  as: 'assignedLeads', // Changed alias to avoid duplication
});
db.lead_assignee.belongsTo(db.users, {
  foreignKey: 'user_id',
  as: 'user', // Changed alias
});


db.leads.hasMany(db.lead_assignee, {
  foreignKey: 'lead_id',
  as: 'assignedUsers', // Changed alias
});
db.lead_assignee.belongsTo(db.leads, {
  foreignKey: 'lead_id',
  as: 'lead', // Changed alias
});


db.users.hasMany(db.lead_assignee, {
  foreignKey: 'assigned_by',
  as: 'assignedByLeads', // Changed alias
});
db.lead_assignee.belongsTo(db.users, {
  foreignKey: 'assigned_by',
  as: 'assignedByUser', 
});


//----------------------------------------------------

db.emails.hasMany(db.user_email, {
  foreignKey: 'email_id',
    as: 'user_email', // Changed alias
});
db.user_email.belongsTo(db.emails, {
  foreignKey: 'email_id',
  as: 'email', 
});

//----------------------------------------------------------
db.users.hasMany(db.activity_log, {
  foreignKey: 'user_id',
  as: 'activity_log', // Changed alias
});
db.activity_log.belongsTo(db.users, {
  foreignKey: 'user_id',
  as: 'user', 
});

module.exports = db;