    # common fields in models
    CreatedBy: {
        type: Sequelize.INTEGER,
      },
      ChangedBy: {
        type: Sequelize.INTEGER,
      },
      created_at:{
        type:Sequelize.DATE
      }





      const Activity= require('../../utils/Activity.controller'); // Adjust the path

       Activity.logs_entry(data.dataValues, options, 'create', 'industry',sequelize);