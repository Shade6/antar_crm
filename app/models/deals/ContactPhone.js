const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const ContactPhone = sequelize.define("contact_phone", {
     contact_phone_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },

      phone: {
        type: Sequelize.INTEGER,
      },
      is_primary_phone: {
        type: Sequelize.BOOLEAN,
      },
      is_primary_mobile_no: {
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
    ContactPhone.beforeCreate((data, options) => {
      data.contact_phone_id = uuidv4();
    });
    return ContactPhone;
  };