const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const DealStatus = sequelize.define("deal_status", {
     deal_status_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      deal_status: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.UUID,
      },
      createdOn: {
        type: Sequelize.DATE,
      },
      updatedBy: {
        type: Sequelize.UUID,
      },
      UpdatedOn: {
        type: Sequelize.DATE,
      },
    });
    DealStatus.beforeCreate((data, options) => {
      data.deal_status_id = uuidv4();
    });
    return DealStatus;
  };