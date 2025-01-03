const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Territory = sequelize.define("territory", {
    territory_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      territory_name: {
        type: Sequelize.STRING,
      },
      parent_territory: {
        type: Sequelize.STRING,
      },
      territory_manager: { // user_id
        type: Sequelize.STRING,
      }, 
      is_group: { 
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        type: Sequelize.DATE,
      }
    });
    Territory.beforeCreate((data, options) => {
      data.territory_id = uuidv4();
    });
    return Territory;
  };