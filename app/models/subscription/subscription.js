const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Subscription = sequelize.define("subscription", {
        subscription_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
          },
          tenant_id: {
            type: Sequelize.UUID,
            allowNull: false,
          },
          plan_id: {
            type: Sequelize.UUID,
            allowNull: false,
          },
          subscription_plan: { 
            type: Sequelize.ENUM('monthly', 'annual'),
            allowNull: true,
          },
          start_date: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          end_date: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          status: {
            type: Sequelize.ENUM('active', 'expired', 'canceled'),
            allowNull: false,
            defaultValue: 'active', // Default to 'active' status
          },
          payment_method: {
            type: Sequelize.ENUM('credit_card', 'debit_card', 'upi', 'net_banking', 'paypal'),
            allowNull: true, // Allow NULL initially, will be updated after payment
          },
          bill_date: {
            type: Sequelize.DATE,
            allowNull: true, // Allow NULL initially
          },
          payment_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // Allow NULL initially
          },
    });
    Subscription.beforeCreate((data, options) => {
      data.subscription_id = uuidv4();
    });
    
    return Subscription;
  };