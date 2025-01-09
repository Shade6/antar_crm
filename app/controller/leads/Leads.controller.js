const field_checker = require("../../utils/validate_body");
const db = require("../../models");
const Leads = db.leads;
const Users = db.users;
const LeadAssignee = db.lead_assignee;
const Territory = db.territory;
const Industry = db.industry;
exports.create_lead = async (req, res) => {
  try {
    console.log(req.body);
    const {
      salutation,
      first_name,
      last_name,
      email,
      mobile,
      gender,
      organization,
      website,
      employees,
      territory_id,
      revenue,
      industry_id,
      status,
      owner_id,
    } = req.body;
    console.log("start ---------");
    const validation = field_checker.checkNullValues({
      salutation: salutation.value,
      first_name: first_name,
      last_name: last_name,
      organization: organization,
      status: status.value,
      email: email,
      mobile: mobile,
    });
    if (!validation.isValid) {
      return res.json({
        message: `${validation.field} cannot be null`,
        statusCode: 400,
      });
    }

    const find_owner = await Users.findOne({
      where: { user_id: owner_id.value },
    });

    if (!find_owner) {
      return res.json({ message: "owner not found", statusCode: 400 });
    }

    const create_ = await Leads.create({
      salutation: salutation.value ?? "",
      first_name: first_name ?? "",
      last_name: last_name ?? "",
      lead_name:
        find_owner.first_name ?? "" + " " + find_owner.last_name ?? " ",
      company: organization ?? null,
      contact: mobile ?? null,
      email: email ?? null,
      gender: gender.value ?? null,
      website: website ?? null,
      status: status.value ?? null,
      employees: employees.value ?? null,
      territory_id: territory_id.value ?? null,
      industry_id: industry_id.value ?? null,
      revenue: revenue,
      created_by: find_owner.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    if (create_) {
      await LeadAssignee.create({
        user_id: find_owner.user_id,
        lead_id: create_.lead_id,
        assigned_by: find_owner.user_id,
        assigned_at: new Date(),
      });
      return res.json({
        message: "lead created successfully",
        statusCode: 200,
        data: create_,
      });
    } else {
      return res.json({ message: "lead created failed", statusCode: 400 });
    }
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};
exports.getLeads = async (req, res) => {
  try {
    const user = req.user
    const find_assignees = await LeadAssignee.findAll({where:{user_id:user}})
    const find_all = await Leads.findAll({where:{lead_id:find_assignees.map((val)=>val.lead_id)}});
    return res.json({
      message: "leads found",
      statusCode: 200,
      data: find_all ?? [],
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.find_single_lead = async (req, res) => {
  try {
    const lead_id = req.query.id;
    if (!lead_id) {
      return res.json({
        message: "lead requirement not found",
        statusCode: 400,
      });
    }
    const find_all = await Leads.findOne({
      where: { lead_id: lead_id },
      include: [
        {
          model: Territory,
          as: "territory",
        },
        {
          model: Industry,
          as: "industry",
        },
      ],
    });
    return res.json({
      message: "leads found",
      statusCode: 200,
      data: find_all ?? {},
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};
exports.find_assignees = async (req, res) => {
  try {
    const lead_id = req.query.id;
    if (!lead_id) {
      return res.json({
        message: "lead requirement not found",
        statusCode: 400,
      });
    }

    const findALl = await LeadAssignee.findAll({
      where: { lead_id: lead_id },
      include: [
        {
          model: Leads,
          as: "lead",
        },
        {
          model:Users,
          as:'user'
        },
        {
          model:Users,
          as:'assignedByUser'
        }
      ],
    });
    return res.json({message:'lead assignee found',statusCode:200,data:findALl ?? []})
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};


exports.update_lead_assignee=async(req,res)=>{
  try {
    const {lead_id,users} = req.body;
    console.log(req.body)
    const find_lead = await Leads.findOne({where:{lead_id:lead_id}})
    if(!find_lead){
      return res.json({message:'lead not found',statusCode:400})
    }
    if(users.length == 0){
      return res.json({message:'cannot assign ! users is empty',statusCode:400})
    }
    const find_assignees = await LeadAssignee.findAll({where:{lead_id:lead_id}})
  
    for(let data of users){
      const find_user_on_assignee = await LeadAssignee.findOne({where:{lead_id:lead_id,user_id:data.value}})
      if(!find_user_on_assignee){
        await LeadAssignee.create({
          user_id:data.value,
          lead_id:lead_id,
          assigned_by:req.user
        })
      }
    }

    return res.json({message:'assign to updation completed',statusCode:200})

  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
}