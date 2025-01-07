const { v4: uuidv4 } = require("uuid");
const { territory, industry } = require("..");
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
      website:{
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['New', 'Contacted', 'Nurture','Qualified','UnQualified','Junk'],
      },
      employees:{
        type: Sequelize.STRING,
      },
      assigned_to: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.STRING,
      },
      territory_id:{
        type: Sequelize.STRING,
      },
      industry_id:{
        type: Sequelize.STRING,
      },
      revenue:{
        type: Sequelize.INTEGER,
      },
      changed_by: {
        type: Sequelize.INTEGER,
      },
      created_at:{
        type:Sequelize.DATE
      },
      updated_at:{
        type:Sequelize.DATE
      }
    });
    Leads.beforeCreate((data, options) => {
      data.lead_id = uuidv4();
    });
    return Leads;
  };