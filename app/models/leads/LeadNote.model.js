const { v4: uuidv4 } = require("uuid");
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
  return LeadNote;
};
