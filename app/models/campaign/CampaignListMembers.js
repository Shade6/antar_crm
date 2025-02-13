const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const CampaignListMember = sequelize.define("campaign_list_members", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    campaign_list_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    contact_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  return CampaignListMember;
};