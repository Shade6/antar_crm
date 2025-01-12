
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const Emails = sequelize.define("email", {
      email_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      email_address: {
        type: Sequelize.STRING,
      },
      service: {
        type: Sequelize.STRING,
      },
      domain: {
        type: Sequelize.STRING,
      },
      diff_email: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      ascii_email: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      account_name: {
        type: Sequelize.STRING,
      },
      auth_method: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      attachment_limit: {
        type: Sequelize.STRING,
      },
      default_incoming: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      default_outgoing: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      incoming_use_imap: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      incoming_use_ssl: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      incoming_validate_ssl: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      incoming_email_sync: {
        type: Sequelize.ENUM,
        values: ['unseen', 'all'],
      },
      initial_sync_count: {
        type: Sequelize.ENUM,
        values: ["100", "50"],
      },
      incoming_server: {
        type: Sequelize.STRING,
      },
      incoming_port: {
        type: Sequelize.STRING,
      },
      track_email_status: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      outgoing_use_lls: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      outgoing_use_ssl: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      outgoing_server: {
        type: Sequelize.STRING,
      },
      outgoing_port: {
        type: Sequelize.STRING,
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
    Emails.beforeCreate((data, options) => {
        data.module_id = uuidv4();
      });
    return Emails;
  };