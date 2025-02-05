const { v4: uuidv4 } = require("uuid");
const Activity= require('../../utils/Activity.controller'); // Adjust the path
module.exports = (sequelize, Sequelize) => {
    const Territory = sequelize.define("territory", {
    territory_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      tenant_id:{
        type:Sequelize.UUID,
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
    Territory.afterCreate((data, options) => {
      Activity.logs_entry(data.dataValues, options, 'create', 'territory',sequelize);
    });
    Territory.afterUpdate((data, options) => {
      Activity.logs_entry(data.dataValues, options, 'update', 'territory',sequelize);
    });
    Territory.beforeDestroy((data, options) => {
      Activity.logs_entry(data.dataValues, options, 'delete', 'territory',sequelize);
    });
    return Territory;
  };