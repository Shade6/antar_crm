const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const ProductMapping = sequelize.define("product_mapping", {
    product_mapping_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      opportunity_id: {
        type: Sequelize.UUID,
      },
      product_id: {
        type: Sequelize.UUID,
      },
      changed_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    ProductMapping.beforeCreate((data, options) => {
      data.product_mapping_id = uuidv4();
    });
    return ProductMapping;
  };