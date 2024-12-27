module.exports = (sequelize, Sequelize) => {
  const Customers = sequelize.define("Customers", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
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
    CreatedBy: {
      type: Sequelize.INTEGER,
    },
    ChangedBy: {
      type: Sequelize.INTEGER,
    },
  });

  return Customers;
};
