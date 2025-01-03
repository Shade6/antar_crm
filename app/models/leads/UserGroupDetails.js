const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const UserGroupDetails = sequelize.define("user_group_details", {
      group_details_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      group_id: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
      }
    });
    UserGroupDetails.beforeCreate((data, options) => {
      data.group_details_id = uuidv4();
    });
    return UserGroupDetails;
  };