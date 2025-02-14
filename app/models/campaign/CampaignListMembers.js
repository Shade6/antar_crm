const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
  const CampaignListMember = sequelize.define("campaign_list_members", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    campaign_list_id: {
      type: Sequelize.UUID,
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
    updated_at:{
      type: Sequelize.DATE,
    },
    created_by:{
      type:Sequelize.UUID
    }
  });

  return CampaignListMember;
};