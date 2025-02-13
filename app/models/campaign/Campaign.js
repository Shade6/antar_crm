const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Campaign = sequelize.define("campaigns", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    campaign_title: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    campaign_type: {
      type: Sequelize.ENUM("email", "call", "whatsapp"),
      allowNull: false,
    },
    sender_email: {
      type: Sequelize.STRING(255),
    },
    sender_phone: {
      type: Sequelize.STRING(20),
    },
    recipient_list_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    subject: {
      type: Sequelize.STRING(255),
    },
    content: {
      type: Sequelize.TEXT,
    },
    execution_type: {
      type: Sequelize.ENUM("immediate", "scheduled"),
      defaultValue: "immediate",
    },
    scheduled_time: {
      type: Sequelize.DATE,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  return Campaign;
};