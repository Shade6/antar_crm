module.exports = (sequelize, Sequelize) => {
    const SalesOrders = sequelize.define("SalesOrders", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      CreatedBy: {
        type: Sequelize.INTEGER,
      },
      ChangedBy: {
        type: Sequelize.INTEGER,
      },
    });
  
    return SalesOrders;
  };