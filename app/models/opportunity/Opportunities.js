const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
  const Opportunities = sequelize.define("opportunities", {
    opportunity_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    organization_id: {
      type: Sequelize.UUID,
    },
    tenant_id:{
      type:Sequelize.UUID,
    },
    opportunity_name: {
      type: Sequelize.STRING,
    },
    opportunity_value: {
      type: Sequelize.STRING,
    },  
    contact_id:{
      type: Sequelize.UUID,
    }, 
    opportunity_owner_id: {
      type: Sequelize.UUID,
    },
    lead_id: {
      type: Sequelize.UUID,
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
    created_by: {
      type: Sequelize.UUID,
    },
    created_on: {
      type: Sequelize.DATE,
    },
    changed_by: {
      type: Sequelize.INTEGER,
    },
    pdf:{
       type:Sequelize.STRING
    },
    changed_on: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
  Opportunities.beforeCreate((data, options) => {
    data.opportunity_id = uuidv4();
  });
  return Opportunities;
};
