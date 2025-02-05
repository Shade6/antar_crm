const Activity= require('../../utils/Activity.controller'); // Adjust the path
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
  const Industry = sequelize.define("industry", {
    industry_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    tenant_id:{
      type:Sequelize.UUID,
    },
    industry_name: {
      type: Sequelize.STRING,
    },
    created_by: {
      type: Sequelize.STRING,
    },
    created_at: {
      type: Sequelize.DATE,
    },
  });

  // Adding hooks
  Industry.addHook('beforeCreate', (data, options) => {
    data.industry_id = uuidv4();
  });

  Industry.addHook('afterCreate', (data, options) => {
    Activity.logs_entry(data.dataValues, options, 'create', 'industry',sequelize);
  });

  Industry.addHook('afterUpdate', (data, options) => {
    console.log(`Industry with ID ${data.industry_id} was updated`);
  });

  Industry.addHook('beforeDestroy', (data, options) => {
    Activity.logs_entry(data.dataValues, options, 'delete', 'industry',sequelize);
  });

  return Industry;
};
