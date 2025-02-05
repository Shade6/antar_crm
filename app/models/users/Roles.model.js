
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      role_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      role_name: {
        type: Sequelize.STRING,
      },
      tenant_id:{
        type:Sequelize.UUID,
      },
      role_type:{
        type:Sequelize.STRING
      },
      page_status:{
        type:Sequelize.BOOLEAN
      },
      page:{
        type:Sequelize.STRING
      },
      owner:{
        type:Sequelize.BOOLEAN
      },
      is_active:{
        type:Sequelize.BOOLEAN
      },
      is_deletable:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
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
    Role.beforeCreate((data, options) => {
        data.role_id = uuidv4();
      });
    return Role;
  };