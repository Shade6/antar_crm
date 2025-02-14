const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
  const WhatsappCampaignAnalytics = sequelize.define("whatsapp_campaign_analytics", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
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
    created_at:{
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at:{
      type: Sequelize.DATE,
    },
    created_by:{
      type:Sequelize.UUID
    }
  });

  return WhatsappCampaignAnalytics;
};