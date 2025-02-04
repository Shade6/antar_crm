const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Payments = sequelize.define("payments", {
        payment_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
          },
          subscription_id: {
            type: Sequelize.UUID,
            allowNull: false,
          },
          tenant_id: {
            type: Sequelize.UUID,
            allowNull: false,
          },
          amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
          },
          currency: {
            type: Sequelize.STRING(10),
            defaultValue: 'INR',
          },
          payment_method: {
            type: Sequelize.STRING(250),
          },
          payment_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          transaction_id: {
            type: Sequelize.STRING(255),
            unique: true,
            allowNull: false,
          },
          status: {
            type: Sequelize.ENUM('successful', 'failed', 'pending'),
            defaultValue: 'pending',
          },
    });
    Payments.beforeCreate((data, options) => {
        data.payment_id = uuidv4();
    });
    
    return Payments;
  };