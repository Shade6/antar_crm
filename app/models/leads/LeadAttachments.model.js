const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const LeadAttachment = sequelize.define("lead_attachment", {
    lead_attachment_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
      },
      lead_id: {
        type: Sequelize.STRING,
      },
      user_id: { // user_id
        type: Sequelize.STRING,
      }, 
      created_at: {
        type: Sequelize.DATE,
      }
    });
    LeadAttachment.beforeCreate((data, options) => {
      data.lead_attachment_id = uuidv4();
    });
    return LeadAttachment;
  };