
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Deal = sequelize.define("deals", {
      deal_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      organization: {
        type: Sequelize.STRING,
      },
      next_step: {
        type: Sequelize.STRING,
      },
      probability: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      close_data: {
        type: Sequelize.DATE,
      },
      deal_owner: {
        type: Sequelize.STRING,
      },
      contact: {
        type: Sequelize.STRING,
      },
      lead_id:{
         type:Sequelize.UUID,
         allowNull: false,
      },
      website: {
        type: Sequelize.STRING,
      },
      no_of_employees: {
        type: Sequelize.STRING,
      },
      job_title: {
        type: Sequelize.STRING,
      },
      territory_id: {
        type: Sequelize.UUID,
      },
      currency_id: {
        type: Sequelize.UUID,
      },
      annual_revenue: {
        type: Sequelize.INTEGER,
      },
      industry_id: {
        type: Sequelize.UUID,
      },
      salutation: {
        type: Sequelize.STRING,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      mobile_no: {
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.STRING,
      },
      sla: {
        type: Sequelize.STRING,
      },
      sla_creation: {
        type: Sequelize.STRING,
      },
      sla_status: {
        type: Sequelize.BOOLEAN,
      },
      communication_status: {
        type: Sequelize.STRING,
      },
      response_by: {
        type: Sequelize.STRING,
      },
      first_response_time: {
        type: Sequelize.DATE,
      },
      first_responded_on: {
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.UUID,
      },
      createdOn: {
        type: Sequelize.DATE,
      },
      updatedBy: {
        type: Sequelize.UUID,
      },
      UpdatedOn: {
        type: Sequelize.DATE,
      },
    });
    Deal.beforeCreate((data, options) => {
      data.deal_id = uuidv4();
    });
    return Deal;
  };