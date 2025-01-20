const { v4: uuidv4 } = require("uuid");
const Activity= require('../../utils/Activity.controller'); // Adjust the path
module.exports = (sequelize, Sequelize) => {
  const LeadNote = sequelize.define("lead_note", {
    lead_note_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
    lead_id: {
      type: Sequelize.UUID, // Match the data type in `Leads`
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID, // Match the data type in `Leads`
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
    },
  });
  LeadNote.beforeCreate((data, options) => {
    data.lead_note_id = uuidv4();
  });
  LeadNote.afterCreate((data, options) => {
    Activity.logs_entry(data.dataValues, options, 'create', 'lead_note',sequelize);
  });
  let before = {}
  LeadNote.beforeBulkUpdate(async(options) => {
    const rowsToDelete = await LeadNote.findAll({ where: options.where });
    before = rowsToDelete[0].dataValues
  });

  LeadNote.afterBulkUpdate(async(options) => {
    const rowsToDelete = await LeadNote.findAll({ where: options.where });
    Activity.logs_entry({
      before: before,
      after: rowsToDelete[0].dataValues
    }, options?.context, 'edit', 'lead_note',sequelize);
  });

  LeadNote.beforeBulkDestroy(async(options) => {
    const rowsToDelete = await LeadNote.findAll({ where: options.where });
    Activity.logs_entry(rowsToDelete[0].dataValues, options?.context, 'delete', 'lead_note',sequelize);
  });
  return LeadNote;
};
