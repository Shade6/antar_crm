const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Industry = sequelize.define("industry", {
        industry_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      industry_name: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
      }
    });
    Industry.beforeCreate((data, options) => {
      data.industry_id = uuidv4();
    });
    return Industry;
  };