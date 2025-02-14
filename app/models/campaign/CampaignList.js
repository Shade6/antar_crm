const { Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
  const CampaignList = sequelize.define("campaign_lists", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    tenant_id:{
      type: Sequelize.UUID,
    },
    list_name: {
      type: Sequelize.STRING(255),
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

  return CampaignList;
};