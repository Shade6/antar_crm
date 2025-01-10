const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const LeadTask = sequelize.define("lead_task", {
    lead_task_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      lead_id: {
        type: Sequelize.UUID, // Match the data type in `Leads`
         allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID, // Match the data type in `Leads`
        allowNull: false,
      },
      title: { // user_id
        type: Sequelize.STRING,
      }, 
      description: { // user_id
        type: Sequelize.STRING,
      }, 
      type: { // user_id
        type: Sequelize.ENUM,
        values: ['Backlog', 'Todo', 'In Progress','Done','canceled'],
      }, 
      big_status: { // user_id
        type: Sequelize.ENUM,
        values: ['Low', 'Medium', 'High'],
      }, 
      task_status:{
        type: Sequelize.ENUM,
        values: ['Calling', 'Meeting', 'Event'],
      },
      created_by:{
        type: Sequelize.UUID, // Match the data type in `Leads`
        allowNull: false,
      },
      task_date:{
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
      }
    });
    LeadTask.beforeCreate((data, options) => {
      data.lead_task_id = uuidv4();
    });
    return LeadTask;
  };