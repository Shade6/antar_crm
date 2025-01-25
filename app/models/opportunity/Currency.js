const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Currency = sequelize.define("currency", {
     currency_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },

      currency_name: {
        type: Sequelize.STRING,
      },
      enabled: {
        type: Sequelize.BOOLEAN,
      },
      fraction: {
        type: Sequelize.STRING,
      },
      fraction_units: {
        type: Sequelize.STRING,
      },
      smallest_currency_fraction_value: {
        type: Sequelize.STRING,
      },
      symbol: {
        type: Sequelize.STRING,
      },
      symbol_on_right: {
        type: Sequelize.STRING,
      },
    
      number_format: {
        type: Sequelize.STRING,
      },


    });
    Currency.beforeCreate((data, options) => {
      data.currency_id = uuidv4();
    });
    return Currency;
  };