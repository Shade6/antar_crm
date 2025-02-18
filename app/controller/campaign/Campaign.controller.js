const db = require("../../models");
const CallCampaignAnalytics = db.call_campaign_analytics;
const Campaign = db.campaign;
const CampaignList = db.campaign_list;
const CampaignListMember = db.campaign_list_members;
const EmailCampaignAnalytics = db.email_campaign_analytics;
const WhatsappCampaignAnalytics = db.whatsapp_campaign_analytics;
const Contacts = db.contacts
const Users = db.users;
const CampaignEmail = db.campaign_email
const emailValidator = require("email-validator");
// Call Campaign Analytics Controller

exports.getCallCampaignAnalytics = async (req, res) => {
  try {
    const { campaign_id } = req.query;
    const whereClause = {};
    if (campaign_id) whereClause.campaign_id = campaign_id;

    const analytics = await CallCampaignAnalytics.findAll({
      where: whereClause,
    });
    return res.status(200).json({ data: analytics, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.createCallCampaignAnalytic = async (req, res) => {
  try {
    const analytic = await CallCampaignAnalytics.create(req.body);
    return res.status(200).json({ data: analytic, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.updateCallCampaignAnalytic = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await CallCampaignAnalytics.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedAnalytic = await CallCampaignAnalytics.findByPk(id);
      return res.status(200).json({ data: updatedAnalytic, statusCode: 200 });
    }
    throw new Error("Analytic not found");
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.deleteCallCampaignAnalytic = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CallCampaignAnalytics.destroy({ where: { id } });
    if (deleted)
      return res
        .status(200)
        .json({ message: "Analytic deleted", statusCode: 200 });
    throw new Error("Analytic not found");
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.deleteMultipleCallCampaignAnalytics = async (req, res) => {
  try {
    const { ids } = req.body;
    const deleted = await CallCampaignAnalytics.destroy({ where: { id: ids } });
    return res
      .status(200)
      .json({ message: `${deleted} analytics deleted`, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

// Campaigns Controller
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll();
    return res.status(200).json({ data: campaigns, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);
    return res.status(200).json({ data: campaign, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Campaign.update(req.body, { where: { id } });
    if (updated) {
      const updatedCampaign = await Campaign.findByPk(id);
      return res.status(200).json({ data: updatedCampaign, statusCode: 200 });
    }
    throw new Error("Campaign not found");
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Campaign.destroy({ where: { id } });
    if (deleted)
      return res
        .status(200)
        .json({ message: "Campaign deleted", statusCode: 200 });
    throw new Error("Campaign not found");
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.deleteMultipleCampaigns = async (req, res) => {
  try {
    const { ids } = req.body;
    const deleted = await Campaign.destroy({ where: { id: ids } });
    return res
      .status(200)
      .json({ message: `${deleted} campaigns deleted`, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

// Campaign Lists Controller
exports.getCampaignLists = async (req, res) => {
  try {
    const lists = await CampaignList.findAll({
      where: { tenant_id: req.tenant },
      include: {
        model: Users,
        as: "user",
      },
    });
    return res.status(200).json({ data: lists, statusCode: 200 });
  } catch (error) {
    return res.status(200).json({ message: error.message, statusCode: 400 });
  }
};

exports.createCampaignList = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.list_name) {
      return res
        .status(200)
        .json({ message: "campaign list name not provided", statusCode: 400 });
    }
    if (req.body.contact_list?.length ==0) {
      return res
        .status(200)
        .json({ message: "contact list  not provided", statusCode: 400 });
    }


    const find_list_name_exist = await CampaignList.findOne({where:{list_name:req.body.list_name}})
    if(find_list_name_exist){
      return res
      .status(200)
      .json({ message: "list name already exist", statusCode: 400 });
    }

    const list = await CampaignList.create({
      list_name: req.body.list_name,
      tenant_id: req.tenant,
      created_by:req.user
    });


      for(let contact of req.body.contact_list){
        const find_contact = await Contacts.findOne({where:{contact_id:contact}})
        if(!find_contact){
            await CampaignListMember.destroy({where:{campaign_list_id:list.id}})
            await CampaignList.destroy({where:{id:list.id}})
                return res
                .status(200)
                .json({
                  message: "contact requirements failed please try again",
                  statusCode: 400,
                });
        }

        await CampaignListMember.create({
          campaign_list_id:list.id,
          contact_id:contact,
          created_by:req.user
        })
      }

    return res
      .status(200)
      .json({
        data: list,
        message: "campaign created successfully",
        statusCode: 200,
      });




  } catch (error) {
    return res.status(200).json({ message: error.message, statusCode: 400 });
  }
};

exports.updateCampaignList = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await CampaignList.update(req.body, { where: { id } });
    if (updated) {
      const updatedList = await CampaignList.findByPk(id);
      return res.status(200).json({ data: updatedList, statusCode: 200 });
    }
    throw new Error("List not found");
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.deleteCampaignList = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CampaignList.destroy({ where: { id } });
    if (deleted)
      return res.status(200).json({ message: "List deleted", statusCode: 200 });
    throw new Error("List not found");
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.deleteMultipleCampaignLists = async (req, res) => {
  try {
    const { ids } = req.body;
    const deleted = await CampaignList.destroy({ where: { id: ids } });
    return res
      .status(200)
      .json({ message: `${deleted} lists deleted`, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

// Campaign List Members Controller
exports.getCampaignListMembers = async (req, res) => {
  try {
    const { campaign_list_id } = req.query;
    const members = await CampaignListMember.findAll({
      where: { campaign_list_id },
    });
    return res.status(200).json({ data: members, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.createCampaignListMember = async (req, res) => {
  try {
    const member = await CampaignListMember.create(req.body);
    return res.status(200).json({ data: member, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.updateCampaignListMember = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await CampaignListMember.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedMember = await CampaignListMember.findByPk(id);
      return res.status(200).json({ data: updatedMember, statusCode: 200 });
    }
    throw new Error("Member not found");
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.deleteCampaignListMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CampaignListMember.destroy({ where: { id } });
    if (deleted)
      return res
        .status(200)
        .json({ message: "Member deleted", statusCode: 200 });
    throw new Error("Member not found");
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

exports.deleteMultipleCampaignListMembers = async (req, res) => {
  try {
    const { ids } = req.body;
    const deleted = await CampaignListMember.destroy({ where: { id: ids } });
    return res
      .status(200)
      .json({ message: `${deleted} members deleted`, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

// Email Campaign Analytics Controller
exports.getEmailCampaignAnalytics = async (req, res) => {
  try {
    const { campaign_id } = req.query;
    const whereClause = {};
    if (campaign_id) whereClause.campaign_id = campaign_id;

    const analytics = await EmailCampaignAnalytics.findAll({
      where: whereClause,
    });
    return res.status(200).json({ data: analytics, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

// Similar create, update, delete functions for EmailCampaignAnalytics...

// Whatsapp Campaign Analytics Controller
exports.getWhatsappCampaignAnalytics = async (req, res) => {
  try {
    const { campaign_id } = req.query;
    const whereClause = {};
    if (campaign_id) whereClause.campaign_id = campaign_id;

    const analytics = await WhatsappCampaignAnalytics.findAll({
      where: whereClause,
    });
    return res.status(200).json({ data: analytics, statusCode: 200 });
  } catch (error) {
    return res.status(400).json({ message: error.message, statusCode: 400 });
  }
};

// Similar create, update, delete functions for WhatsappCampaignAnalytics...
exports.deleteMultipleWhatsappCampaignAnalytics = async (req, res) => {
  try {
    const { ids } = req.body;
    await WhatsappCampaignAnalytics.destroy({
      where: {
        id: ids,
      },
    });
    return res.status(200).json({
      message: "Whatsapp Campaign Analytics deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
      statusCode: 400,
    });
  }
};

exports.deleteWhatsappCampaignAnalytic = async (req, res) => {
  try {
    const { id } = req.params;
    await WhatsappCampaignAnalytics.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: "Whatsapp Campaign Analytic deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
      statusCode: 400,
    });
  }
};

exports.editWhatsappCampaignAnalytic = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAnalytic = await WhatsappCampaignAnalytics.update(req.body, {
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      data: updatedAnalytic,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
      statusCode: 400,
    });
  }
};

exports.getWhatsappCampaignAnalytic = async (req, res) => {
  try {
    const { id } = req.params;
    const analytic = await WhatsappCampaignAnalytics.findOne({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      data: analytic,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
      statusCode: 400,
    });
  }
};

exports.deleteEmailCampaignAnalytic = async (req, res) => {
  try {
    const { id } = req.params;
    await EmailCampaignAnalytics.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: "Email Campaign Analytic deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
      statusCode: 400,
    });
  }
};

exports.editEmailCampaignAnalytic = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAnalytic = await EmailCampaignAnalytics.update(req.body, {
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      data: updatedAnalytic,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
      statusCode: 400,
    });
  }
};

exports.getEmailCampaignAnalytic = async (req, res) => {
  try {
    const { id } = req.params;
    const analytic = await EmailCampaignAnalytics.findOne({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      data: analytic,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
      statusCode: 400,
    });
  }
};

exports.getEmailCampaignAnalytics = async (req, res) => {
  try {
    const tenant_id = req.tenant;
    const analytics = await EmailCampaignAnalytics.findAll({
      where: {
        tenant_id: tenant_id,
      },
    });
    return res.status(200).json({
      data: analytics,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
      statusCode: 400,
    });
  }
};


exports.get_all_campaign_emails=async(req,res)=>{
  try {
    const find_all_emails =await CampaignEmail.findAll({where:{tenant_id:req.tenant}})
    res.json({message:'email found',statusCode:200,data:find_all_emails ||[]});
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
      statusCode: 400,
    });
  }
}

exports.create_campaign_email=async(req,res)=>{
try {
    const {email} = req.body
 if (!emailValidator.validate(email)) {
      return res.json({
        message: "invalid email ! please check the email",
        statusCode: 400,
      });
    }

    const create_ = await CampaignEmail.create({
      tenant_id:req.tenant,
      email:email,
      created_by:req.user
    })

    res.json({message:'campaign email created',statusCode:200,data:create_})

} catch (error) {
  console.error(error);
  return res.status(400).json({
    message: error.message,
    statusCode: 400,
  });
}
}