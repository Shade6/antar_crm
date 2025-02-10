const { v4: uuidv4 } = require("uuid");
const Activity = require('../../utils/Activity.controller'); // Adjust the path
module.exports = (sequelize, Sequelize) => {
    const LeadComment = sequelize.define("comment", {
        comment_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        comment: {
            type: Sequelize.STRING,
        },
        lead_id: {
            type: Sequelize.UUID, // Match the data type in `Leads`
        
        },
        opportunity_id:{
            type: Sequelize.UUID, // Match the data type in `Leads`
        },
        user_id: { // user_id
            type: Sequelize.UUID, // Match the data type in `Leads`
            allowNull: false,
        },
        created_at: {
            type: Sequelize.DATE,
        }
    });

    LeadComment.beforeCreate((data, options) => {
        data.comment_id = uuidv4();
    });
 

    return LeadComment;
};