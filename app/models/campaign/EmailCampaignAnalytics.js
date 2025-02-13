const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const EmailCampaignAnalytics = sequelize.define("email_campaign_analytics", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    campaign_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    recipient: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    sent_at: {
      type: Sequelize.DATE,
    },
    delivered_at: {
      type: Sequelize.DATE,
    },
    opened_at: {
      type: Sequelize.DATE,
    },
    clicked_at: {
      type: Sequelize.DATE,
    },
    bounced_at: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.ENUM("sent", "delivered", "opened", "clicked", "bounced"),
      allowNull: false,
    },
  });

  return EmailCampaignAnalytics;
};