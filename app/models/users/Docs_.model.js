
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const Docs = sequelize.define("docs", {
      doc_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      doc_name: {
        type: Sequelize.STRING,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
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
    Docs.beforeCreate((data, options) => {
        data.doc_id = uuidv4();
      });
    return Docs;
  };