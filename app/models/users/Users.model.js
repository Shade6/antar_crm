
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      role_id: {
        type: Sequelize.STRING,
      },
      enabled: {
        type: Sequelize.BOOLEAN,
      },
      profile:{
        type:Sequelize.STRING
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      changed_by: {
        type: Sequelize.INTEGER,
      },
      created_at:{
        type:Sequelize.DATE
      }
    });
    Users.beforeCreate((data, options) => {
      data.user_id = uuidv4();
    });
    return Users;
  };