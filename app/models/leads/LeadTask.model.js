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
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.STRING,
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
      created_by:{
        type: Sequelize.STRING,
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