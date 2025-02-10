const { v4: uuidv4 } = require("uuid");
const Activity = require("../../utils/Activity.controller"); // Adjust the path
module.exports = (sequelize, Sequelize) => {
  const LeadTask = sequelize.define("task", {
    task_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    lead_id: {
      type: Sequelize.UUID, // Match the data type in `Leads`
    },
    opportunity_id:{
        type:Sequelize.UUID
    },
    user_id: {
      type: Sequelize.UUID, // Match the data type in `Leads`
      allowNull: false,
    },
    title: {
      // user_id
      type: Sequelize.STRING,
    },
    description: {
      // user_id
      type: Sequelize.STRING,
    },
    type: {
      // user_id
      type: Sequelize.ENUM,
      values: ["Backlog", "Todo", "In Progress", "Done", "canceled"],
    },
    big_status: {
      // user_id
      type: Sequelize.ENUM,
      values: ["Low", "Medium", "High"],
    },
    task_status: {
      type: Sequelize.ENUM,
      values: ["Calling", "Meeting", "Event"],
    },
    note_text: {
      type: Sequelize.STRING,
    },
    created_by: {
      type: Sequelize.UUID, // Match the data type in `Leads`
      allowNull: false,
    },
    task_date: {
      type: Sequelize.DATE,
    },
    created_at: {
      type: Sequelize.DATE,
    },
  });
  LeadTask.beforeCreate((data, options) => {
    data.task_id = uuidv4();
  });

  return LeadTask;
};
