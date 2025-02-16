const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
  const CampaignEmail = sequelize.define("campaign_email", {
    campaign_email_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    tenant_id:{
      type: Sequelize.UUID,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    is_verified:{
      type:Sequelize.BOOLEAN,
      defaultValue: false
    },
    created_at: {
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

  return CampaignEmail;
};