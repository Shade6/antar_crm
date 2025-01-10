const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("country", {
     country_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },

      country_name: {
        type: Sequelize.STRING,
      },
      date_format: {
        type: Sequelize.STRING,
      },
      time_format: {
        type: Sequelize.STRING,
      },
      parent: {
        type: Sequelize.STRING,
      },
      time_zones: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
      },
      currency_id: {
        type: Sequelize.UUID,
      },


    });
    Country.beforeCreate((data, options) => {
      data.country_id = uuidv4();
    });
    return Country;
  };