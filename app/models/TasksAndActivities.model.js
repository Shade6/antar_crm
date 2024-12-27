module.exports = (sequelize, Sequelize) => {
    const TasksAndActivities = sequelize.define("TasksAndActivities", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      CreatedBy: {
        type: Sequelize.INTEGER,
      },
      ChangedBy: {
        type: Sequelize.INTEGER,
      },
    });
  
    return TasksAndActivities;
  };