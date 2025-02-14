const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
  const CallCampaignAnalytics = sequelize.define("call_campaign_analytics", {
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

  return CallCampaignAnalytics;
};