const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const UserGroup = sequelize.define("user_group", {
      group_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      group_name: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
      }
    });
    UserGroup.beforeCreate((data, options) => {
      data.group_id = uuidv4();
    });
    return UserGroup;
  };