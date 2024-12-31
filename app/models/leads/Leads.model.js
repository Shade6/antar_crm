const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Leads = sequelize.define("Leads", {
      lead_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
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
      phone_number: {
        type: Sequelize.STRING,
      },
      lead_source: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Open', 'Won', 'Lost'],
      },
      assigned_to: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      changed_by: {
        type: Sequelize.INTEGER,
      },
      created_at:{
        type:Sequelize.DATE
      }
    });
    Leads.beforeCreate((data, options) => {
      data.lead_id = uuidv4();
    });
    return Leads;
  };