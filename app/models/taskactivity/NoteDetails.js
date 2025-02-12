const { v4: uuidv4 } = require("uuid");
const Activity= require('../../utils/Activity.controller'); // Adjust the path
module.exports = (sequelize, Sequelize) => {
  const LeadNote = sequelize.define("note", {
    note_id: {
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
    },
    opportunity_id:{
      type: Sequelize.UUID, // Match the data type in `Leads`
    },
    tenant_id:{
      type: Sequelize.UUID
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
    data.note_id = uuidv4();
  });
 
  return LeadNote;
};
