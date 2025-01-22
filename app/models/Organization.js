const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Organization = sequelize.define("organization", {
     org_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      organization_name: {
        type: Sequelize.STRING,
      },
      no_of_employees: {
        type: Sequelize.STRING,
      },
      currency: {
        type: Sequelize.STRING,
      },
      annual_revenue: {
        type: Sequelize.INTEGER,
      },
      organization_logo: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      territory: {
        type: Sequelize.UUID,
      },
      industry: {
        type: Sequelize.UUID,
      },
      address: {
        type: Sequelize.UUID,
      },
      created_by: {
        type: Sequelize.UUID,
      },
      created_on: {
        type: Sequelize.DATE,
      },
      changed_by: {
        type: Sequelize.INTEGER,
      },
      changed_on: {
        type: Sequelize.DATE,
      },
    });
    Organization.beforeCreate((data, options) => {
      data.org_id = uuidv4();
    });
    return Organization;
  };