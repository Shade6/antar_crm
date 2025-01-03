const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const ActivityLog = sequelize.define("activity_log", {
      log_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      module_id: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      action_time: {
        type: Sequelize.DATE,
      },
      status:{
         type:Sequelize.BOOLEAN
      },
      action_type: {
        type: Sequelize.ENUM,
        values: ['create', 'delete', 'edit'],
      },
    });
    ActivityLog.beforeCreate((data, options) => {
      data.log_id = uuidv4();
    });
    return ActivityLog;
  };