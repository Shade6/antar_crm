const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const CallCampaignAnalytics = sequelize.define("call_campaign_analytics", {
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
    call_started_at: {
      type: Sequelize.DATE,
    },
    call_answered_at: {
      type: Sequelize.DATE,
    },
    call_duration: {
      type: Sequelize.INTEGER,
    },
    call_status: {
      type: Sequelize.ENUM("initiated", "answered", "missed", "failed"),
      allowNull: false,
    },
  });

  return CallCampaignAnalytics;
};