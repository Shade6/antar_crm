const { v4: uuidv4 } = require("uuid");
const Activity = require('../../utils/Activity.controller'); // Adjust the path
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
            type: Sequelize.UUID, // Match the data type in `Leads`
            allowNull: false,
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
        data.lead_comment_id = uuidv4();
    });
    LeadComment.afterCreate((data,options) => {
        Activity.logs_entry(data.dataValues, options, 'create', 'lead_comment', sequelize);
    });
    let before = {}
    LeadComment.beforeBulkUpdate(async(options) => {
      const rowsToDelete = await LeadComment.findAll({ where: options.where });
      before = rowsToDelete[0].dataValues
   });
    LeadComment.afterBulkUpdate(async(options) => {
      const rowsToDelete = await LeadComment.findAll({ where: options.where });
  

      Activity.logs_entry({
        before: before,
        after: rowsToDelete[0].dataValues
      }, options?.context, 'edit', 'lead_comment', sequelize);
    });

    LeadComment.beforeBulkDestroy(async( options) => {
      const rowsToDelete = await LeadComment.findAll({ where: options.where });
        Activity.logs_entry(rowsToDelete[0].dataValues, options?.context, 'delete', 'lead_comment', sequelize);
    });

    return LeadComment;
};