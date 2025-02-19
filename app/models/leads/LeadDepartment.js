const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const LeadDepartment = sequelize.define("lead_department", {
      lead_department_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      lead_id: {
        type: Sequelize.UUID,
      },
      department:{
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
      },
      updated_at:{
        type: Sequelize.DATE
      }
    });
    LeadDepartment.beforeCreate((data, options) => {
      data.lead_department_id = uuidv4();
    });
    return LeadDepartment;
  };