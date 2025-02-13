const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const WhatsappCampaignAnalytics = sequelize.define("whatsapp_campaign_analytics", {
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
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    sent_at: {
      type: Sequelize.DATE,
    },
    delivered_at: {
      type: Sequelize.DATE,
    },
    read_at: {
      type: Sequelize.DATE,
    },
    replied_at: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.ENUM("sent", "delivered", "read", "replied", "failed"),
      allowNull: false,
    },
  });

  return WhatsappCampaignAnalytics;
};