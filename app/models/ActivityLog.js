const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const ActivityLog = sequelize.define("activity_log", {
      log_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      tenant_id:{
        type:Sequelize.BIGINT,
      },
      module_id: {
        type: Sequelize.BIGINT,
      },
      user_id: {
        type: Sequelize.BIGINT,
      },
      action:{
        type:Sequelize.ENUM,
        values:['create','delete','edit']
      },
      description:{
        type:Sequelize.STRING,
      },
      change: {
        type: Sequelize.JSON,
      },
      ip_address:{
         type:Sequelize.STRING
      },
      changed_at: {
        type: Sequelize.DATE,
      },
    });
    ActivityLog.beforeCreate((data, options) => {
      data.log_id = uuidv4();
    });
    return ActivityLog;
  };