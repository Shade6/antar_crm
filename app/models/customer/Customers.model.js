const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
  const Customers = sequelize.define("Customers", {
    customer_id: {
      type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
    },
    tenant_id:{
      type:Sequelize.UUID,
    },
    customer_name: {
      type: Sequelize.STRING,
    },
    customer_type: {
      type: Sequelize.ENUM,
      values: ["Individual", "Company"],
    },
    email: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },

    status: {
      type: Sequelize.ENUM,
      values: ["Active", "Inactive"],
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
  Customers.beforeCreate((data, options) => {
    data.customer_id = uuidv4();
  });
  return Customers;
};
