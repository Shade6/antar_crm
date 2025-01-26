const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const ContactMapping = sequelize.define("contact_mapping", {
    contact_mapping_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      opportunity_id: {
        type: Sequelize.UUID,
      },
      contact_id: {
        type: Sequelize.UUID,
      },
      changed_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    ContactMapping.beforeCreate((data, options) => {
      data.contact_mapping_id = uuidv4();
    });
    return ContactMapping;
  };