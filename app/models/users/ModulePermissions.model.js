
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const ModulePermission = sequelize.define("module_permission", {
      module_permission_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      module_perm_name: {
        type: Sequelize.STRING,
      },
      tenant_id:{
        type:Sequelize.UUID,
      },
      module_status: {
        type: Sequelize.BOOLEAN,
      },
      if_owner: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      perm_level: {
        type: Sequelize.STRING,
      },
      role_id:{
        type:Sequelize.UUID,
      },
      module_id:{
        type:Sequelize.UUID
      },
      read: {
        type: Sequelize.BOOLEAN,
      },
      create: {
        type: Sequelize.BOOLEAN,
      }, 
      delete: {
        type: Sequelize.BOOLEAN,
      },
      amend: {
        type: Sequelize.BOOLEAN,
      },
      import:{
        type: Sequelize.BOOLEAN,
      },
      export:{
        type: Sequelize.BOOLEAN,
      },
      created_by: {
        type: Sequelize.UUID,
      },
      changed_by: {
        type: Sequelize.UUID,
      },
      created_at:{
        type:Sequelize.DATE
      }
    });
    ModulePermission.beforeCreate((data, options) => {
        data.module_permission_id = uuidv4();
      });
    return ModulePermission;
  };