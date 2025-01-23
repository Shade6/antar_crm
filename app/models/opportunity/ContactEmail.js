const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const ContactEmail = sequelize.define("contact_email", {
     contact_email_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      email_id: {
        type: Sequelize.UUID,
      },
      is_primary: {
        type: Sequelize.BOOLEAN,
      },
      parent: {
        type: Sequelize.STRING,
      },
      parent_field: {
        type: Sequelize.STRING,
      },
      parent_type: {
        type: Sequelize.STRING,
      },


      created_by: {
        type: Sequelize.UUID,
      },
      created_on: {
        type: Sequelize.DATE,
      },
      changed_by: {
        type: Sequelize.INTEGER,
      },
      changed_on: {
        type: Sequelize.DATE,
      },
    });
    ContactEmail.beforeCreate((data, options) => {
      data.contact_email_id = uuidv4();
    });
    return ContactEmail;
  };