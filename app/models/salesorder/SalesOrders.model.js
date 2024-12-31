const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const SalesOrders = sequelize.define("SalesOrders", {
      sales_order_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      customer: {
        type: Sequelize.STRING,
      },
      order_date:{
        type:Sequelize.DATE
      },
      expected_delivery_date:{
        type:Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Open', 'Closed', 'Pending'],
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
    SalesOrders.beforeCreate((data, options) => {
      data.sales_order_id = uuidv4();
    });
    return SalesOrders;
  };