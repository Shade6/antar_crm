const { v4: uuidv4 } = require("uuid");
const Activity= require('../../utils/Activity.controller'); // Adjust the path
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
    LeadAttachment.beforeCreate((data, options) => {
      data.lead_attachment_id = uuidv4();
    });
    LeadAttachment.afterCreate((data, options) => {
      Activity.logs_entry(data.dataValues, options, 'create', 'lead_attachment',sequelize);
    });

    LeadAttachment.beforeBulkDestroy(async(options) => {
      const rowsToDelete = await LeadAttachment.findAll({ where: options.where });
      Activity.logs_entry(rowsToDelete[0].dataValues, options?.context, 'delete', 'lead_attachment',sequelize);
    });
  
    return LeadAttachment;
  };