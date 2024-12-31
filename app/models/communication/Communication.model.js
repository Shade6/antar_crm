const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const Communication = sequelize.define("Communication", {
      communication_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      communication_type: {
        type: Sequelize.ENUM,
        values: ['Email', 'Phone', 'Meeting', 'Other'],
      },
      reference_type: {
        type: Sequelize.STRING,
      },
      reference_name: {
        type: Sequelize.STRING,
      },
      communication_date: {
        type: Sequelize.DATE,
      },
      subject: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Sent', 'Received', 'Pending'],
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
    Communication.beforeCreate((data, options) => {
      data.communication_id = uuidv4();
    });
    return Communication;
  };