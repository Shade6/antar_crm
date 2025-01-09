
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const Emails = sequelize.define("email", {
      email_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
      },
      status:{
        type: Sequelize.ENUM,
        values: ['Open', 'Won', 'Lost'],
      },
      created_by: {
        type: Sequelize.STRING,
      },
      changed_by: {
        type: Sequelize.INTEGER,
      },
      created_at:{
        type:Sequelize.DATE
      }
    });
    Emails.beforeCreate((data, options) => {
        data.module_id = uuidv4();
      });
    return Emails;
  };