const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Tenants = sequelize.define("tenants", {
        tenant_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
          },
          organizationName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          workEmail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          contactNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          address: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          subscriptionPlan: {
            type: Sequelize.UUID,
            allowNull: true, // Can be null if tenant hasn't chosen a plan
          },
    });
    Tenants.beforeCreate((data, options) => {
      data.tenant_id = uuidv4();
    });
    
    return Tenants;
  };