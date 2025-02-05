const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Notes = sequelize.define("Notes", {
      note_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      tenant_id:{
        type:Sequelize.UUID,
      },
      note: {
        type: Sequelize.STRING,
      },
      reference_type: {
        type: Sequelize.STRING,
      },
      reference_name: {
        type: Sequelize.STRING,
      },
      full_name: {
        type: Sequelize.STRING,
      },
      enabled: {
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
    Notes.beforeCreate((data, options) => {
      data.note_id = uuidv4();
    });
    return Notes;
  };