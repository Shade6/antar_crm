const { v4: uuidv4 } = require("uuid");


module.exports = (sequelize, Sequelize) => {
    const EstimateItem = sequelize.define("estimate_item", {
     estimate_item_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      estimate_id: {
        type: Sequelize.UUID,
      },
      product_id: {
        type: Sequelize.UUID,
      },
      description: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      unit_price: {
        type: Sequelize.DATE,
      },
      tax_rate:{
        type:Sequelize.INTEGER
      },
      discount:{
        type:Sequelize.INTEGER
      },
      line_total:{
        type:Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at:{
        type: Sequelize.DATE,
      }
    });
    EstimateItem.beforeCreate((data, options) => {
      data.estimate_item_id = uuidv4();
    });
    return EstimateItem;
  };