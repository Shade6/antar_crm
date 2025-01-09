const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const LeadComment = sequelize.define("lead_comment", {
    lead_comment_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      comment: {
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
    LeadComment.beforeCreate((data, options) => {
      data.lead_comment_id = uuidv4();
    });
    return LeadComment;
  };