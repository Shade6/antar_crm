const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
  const EmailCampaignAnalytics = sequelize.define("email_campaign_analytics", {
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

  return EmailCampaignAnalytics;
};