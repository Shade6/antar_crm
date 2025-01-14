
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const TasksAndActivities = sequelize.define("TasksAndActivities", {
      task_activity_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      assigned_to: {
        type: Sequelize.STRING,
      },
      due_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Open', 'Completed', 'Pending'],
      },
      priority: {
        type: Sequelize.ENUM,
        values: ['Low', 'Medium', 'High'],
      },
      reference_type: {
        type: Sequelize.STRING,
      },
      reference_name:{
       type:Sequelize.STRING
      },
      created_by: {
        type: Sequelize.UUID,
      },
      created_on: {
        type: Sequelize.DATE,
      },
      changed_by: {
        type: Sequelize.INTEGER,
      },
      changed_on: {
        type: Sequelize.DATE,
      },
    });
    TasksAndActivities.beforeCreate((data, options) => {
      data.task_activity_id = uuidv4();
    });
    return TasksAndActivities;
  };