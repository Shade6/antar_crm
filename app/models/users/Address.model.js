const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    address_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    address_title:{
        type:Sequelize.STRING,
    },
    address_type: {
      type: Sequelize.STRING,
      allowNull:false   
    },
    address_line_1: {
      type: Sequelize.STRING,
      allowNull:false
    },
    address_line_2: {
      type: Sequelize.STRING,
      allowNull:false
    },
    city: {
      type: Sequelize.STRING,
      allowNull:false
    },
    state: {
      type: Sequelize.STRING,
      allowNull:false
    },
    country: {
      type: Sequelize.STRING,
      allowNull:false
    },
    zip_code: {
      type: Sequelize.STRING,
      allowNull:false
    },
    is_active: {
      type: Sequelize.BOOLEAN,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    created_by: {
      type: Sequelize.INTEGER,
    },
    updated_by: {
      type: Sequelize.INTEGER,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue:Sequelize.NOW
    },
  });
  Address.beforeCreate((data, options) => {
    data.address_id = uuidv4();
  });
  return Address;
};
