
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const UserEmail = sequelize.define("user_email", {
      user_email_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull:false
      },
      email_id:{
         type:Sequelize.UUID,
         allowNull:false
      },
      send_notification:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      send_me_a_copy:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      allowed_in_mentions:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      signature: {
        type: Sequelize.STRING,
      },
      default_email:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      created_by: {
        type: Sequelize.STRING,
      },
      changed_by: {
        type: Sequelize.INTEGER,
      },
      created_at:{
        type:Sequelize.DATE
      }
    });
    UserEmail.beforeCreate((data, options) => {
        data.user_email_id = uuidv4();
      });
    return UserEmail;
  };