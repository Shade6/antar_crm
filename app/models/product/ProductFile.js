const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const ProductFile = sequelize.define("product_file", {
    product_file_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      product_id: {
        type: Sequelize.UUID,
      },
      file:{
        type: Sequelize.STRING
      },
      file_type:{
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.UUID,
      },
      created_at:{
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
      },
      updated_at:{
        type: Sequelize.DATE,
      }

    });
    ProductFile.beforeCreate((data, options) => {
      data.product_file_id = uuidv4();
    });
    return ProductFile;
  };