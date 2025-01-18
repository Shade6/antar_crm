const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const LeadAssignee = sequelize.define("lead_assignee", {
      assignee_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID, // Match the data type in `Leads`
        allowNull: false,
      },
      lead_id:{
        type: Sequelize.UUID, // Match the data type in `Leads`
        allowNull: false,
      },
      assigned_by: {
        type: Sequelize.UUID, // Match the data type in `Leads`
        allowNull: false,
      },
      assigned_at: {
        type: Sequelize.DATE,
      }
    });
    LeadAssignee.beforeCreate((data, options) => {
      data.assignee_id = uuidv4();
    });
    
    return LeadAssignee;
  };