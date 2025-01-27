const { v4: uuidv4 } = require("uuid");


module.exports = (sequelize, Sequelize) => {
    const Estimate = sequelize.define("estimate", {
     estimate_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      organization_id: {
        type: Sequelize.UUID,
      },
      customer_id: {
        type: Sequelize.UUID,
      },
      estimate_number: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      issue_date: {
        type: Sequelize.DATE,
      },
      sub_total:{
        type:Sequelize.INTEGER
      },
      discount_total:{
        type:Sequelize.INTEGER
      },
      tax_total:{
        type:Sequelize.INTEGER
      },
      grand_total:{
        type:Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.STRING,
      },
      notes: {
        type: Sequelize.STRING,
      },
      file_path:{
        type:Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at:{
        type: Sequelize.DATE,
      }
    });
    Estimate.beforeCreate((data, options) => {
      data.estimate_id = uuidv4();
    });
    return Estimate;
  };