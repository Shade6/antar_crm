module.exports = (sequelize, Sequelize) => {
    const Opportunities = sequelize.define("Opportunities", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      lead: {
        type: Sequelize.STRING,
      },
      opportunity_name: {
        type: Sequelize.STRING,
      },
      expected_closing_date:{
        type:Sequelize.DATE
      },
      deal_size: {
        type: Sequelize.INTEGER,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Open', 'Won', 'Lost'],
      },
      assigned_to: {
        type: Sequelize.STRING,
      },
      probability:{
        type:Sequelize.INTEGER
      },
      CreatedBy: {
        type: Sequelize.INTEGER,
      },
      ChangedBy: {
        type: Sequelize.INTEGER,
      },
    });
  
    return Opportunities;
  };
  