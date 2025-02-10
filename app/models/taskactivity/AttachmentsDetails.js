const { v4: uuidv4 } = require("uuid");
const Activity= require('../../utils/Activity.controller'); // Adjust the path
module.exports = (sequelize, Sequelize) => {
    const LeadAttachment = sequelize.define("attachment", {
    attachment_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
      },
      lead_id: {
        type: Sequelize.UUID, // Match the data type in `Leads`
     
      },
      opportunity_id:{
        type: Sequelize.UUID
      },
      user_id: { // user_id
        type: Sequelize.UUID, // Match the data type in `Leads`
        allowNull: false,
      }, 
      created_at: {
        type: Sequelize.DATE,
      }
    });
    LeadAttachment.beforeCreate((data, options) => {
      data.attachment_id = uuidv4();
    });

  
    return LeadAttachment;
  };