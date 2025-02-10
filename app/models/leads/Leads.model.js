const { v4: uuidv4 } = require("uuid");
const Activity= require('../../utils/Activity.controller'); // Adjust the path
module.exports = (sequelize, Sequelize) => {
    const Leads = sequelize.define("Leads", {
      lead_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      salutation:{
        type: Sequelize.STRING,
      },
      tenant_id:{
        type:Sequelize.UUID,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      lead_name: {
        type: Sequelize.STRING,
      },
      company: {
        type: Sequelize.STRING,
      },
      contact: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      gender:{
        type: Sequelize.STRING,
      },
      lead_source: {
        type: Sequelize.STRING,
      },
      lead_score: {
        type: Sequelize.STRING,
      },
      lead_value: {
        type: Sequelize.STRING,
      },
      website:{
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['New', 'Contacted', 'Nurture','Qualified','UnQualified','Junk'],
      },
      converted:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      employees:{
        type: Sequelize.STRING,
      },
      assigned_to: {
        type: Sequelize.UUID, // Match the data type in `Leads`
         allowNull: false,
      },
      territory_id:{
        type: Sequelize.UUID, // Match the data type in `Leads`
        allowNull: false,
      },
      industry_id:{
        type: Sequelize.UUID, // Match the data type in `Leads`
        allowNull: false,
      },
      revenue:{
        type: Sequelize.INTEGER,
      },
      changed_by: {
        type: Sequelize.UUID, // Match the data type in `Leads`
        allowNull: false,
      },
      created_at:{
        type:Sequelize.DATE
      },
      updated_at:{
        type:Sequelize.DATE
      },
      created_by: {
        type: Sequelize.UUID, // Match the data type in `Leads`
        allowNull: false,
      },
    });
    Leads.beforeCreate((data, options) => {
      data.lead_id = uuidv4();
    });
    Leads.afterCreate((data, options) => {
      Activity.logs_entry(data.dataValues, options, 'create', 'leads',sequelize);
    });
    Leads.afterUpdate((data, options) => {
      Activity.logs_entry(data.dataValues, options, 'update', 'leads',sequelize);
    });
    Leads.beforeDestroy((data, options) => {
      Activity.logs_entry(data.dataValues, options, 'delete', 'leads',sequelize);
    }); 
    return Leads;
  };