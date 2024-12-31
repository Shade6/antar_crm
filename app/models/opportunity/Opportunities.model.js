const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Opportunities = sequelize.define("Opportunities", {
      opportunity_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      lead: {
        type: Sequelize.STRING,
      },
      opportunity_name: {
        type: Sequelize.STRING,
      },
      expected_closing_date:{
        type:Sequelize.DATE
      },
      deal_size: {
        type: Sequelize.INTEGER,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Open', 'Won', 'Lost'],
      },
      assigned_to: {
        type: Sequelize.STRING,
      },
      probability:{
        type:Sequelize.INTEGER
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
    Opportunities.beforeCreate((data, options) => {
      data.opportunity_id = uuidv4();
    });
    return Opportunities;
  };
  