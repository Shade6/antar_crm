
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const Module = sequelize.define("module", {
      module_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      module_name: {
        type: Sequelize.STRING,
      },
      docs_type:{
         type:Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN,
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
    Module.beforeCreate((data, options) => {
        data.module_id = uuidv4();
      });
    return Module;
  };