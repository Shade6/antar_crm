const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Plan = sequelize.define("plan", {
        plan_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          description: {
            type: Sequelize.TEXT,
          },
          monthly_price: {
            type: Sequelize.DECIMAL(10, 2),
          },
          annual_price: {
            type: Sequelize.DECIMAL(10, 2),
          },
          features: {
            type: Sequelize.JSON,
          },
    });
    Plan.beforeCreate((data, options) => {
      data.plan_id = uuidv4();
    });
    
    return Plan;
  };