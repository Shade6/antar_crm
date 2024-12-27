module.exports = (sequelize, Sequelize) => {
    const Communication = sequelize.define("Communication", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    });
  
    return Communication;
  };