module.exports = (sequelize, Sequelize) => {
    const Notes = sequelize.define("Notes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
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
      created_at: {
        type: Sequelize.DATE,
      },
    });
  
    return Notes;
  };