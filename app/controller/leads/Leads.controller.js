const field_checker = require("../../utils/validate_body");
const db = require("../../models");
const Leads = db.leads;
const Users = db.users;
const LeadAssignee = db.lead_assignee;
const Territory = db.territory;
const Industry = db.industry;
const LeadScore = db.lead_score;
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
      assigned_to:req.user,
      industry_id: industry_id.value ?? null,
      revenue: revenue,
      created_by: find_owner.user_id,
      changed_by:req.user,
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

exports.create_lead_scoring_rules = async(req,res)=>{
  try {
    console.log(req.body)
    const find_lead_score = await LeadScore.findAll()
    if(find_lead_score.length !== 0){
      return res.json({message:'lead score already exists',statusCode:400})
    }

    const data = {
      territory: JSON.stringify(req.body.demographic_data.selected.selected_territory) ?? '',
      territory_value: req.body.demographic_data.values.value_of_selected_territory ?? '',
      industry: JSON.stringify(req.body.demographic_data.selected.selected_industry) ?? '',
      industry_value: req.body.demographic_data.values.value_of_selected_industry ?? '',
      job_title: JSON.stringify(req.body.demographic_data.selected.selected_job_title) ?? '',
      job_title_value: req.body.demographic_data.values.value_of_selected_job_title ?? '',
      number_of_employees: JSON.stringify(req.body.demographic_data.selected.number_of_employees) ?? '',
      number_of_employees_value: req.body.demographic_data.values.value_of_number_of_employees ?? '',

      annual_revenue: JSON.stringify(req.body.FirmData_data.selected.annual_revenue) ?? '',
      annual_revenue_value: req.body.FirmData_data.values.value_of_annual_revenue ?? '',
      budget: JSON.stringify(req.body.FirmData_data.selected.budget) ?? '',
      budget_value: req.body.FirmData_data.values.value_of_budget ?? '',

      website_visits: JSON.stringify(req.body.Behaviour_data.selected.website_visits) ?? '',
      website_visits_value: req.body.Behaviour_data.values.value_of_website_visits ?? '',
      email_interaction: JSON.stringify(req.body.Behaviour_data.selected.email_interaction) ?? '',
      email_interaction_value: req.body.Behaviour_data.values.value_of_email_interaction ?? '',
      content_engagement: JSON.stringify(req.body.Behaviour_data.selected.content_engagement) ?? '',
      content_engagement_value: req.body.Behaviour_data.values.value_of_content_engagement ?? '',

      telephone_conversation: JSON.stringify(req.body.Engagment_data.selected.telephone_conversation) ?? '',
      telephone_conversation_value: req.body.Engagment_data.values.value_of_telephone_conversation ?? '',
      response_rate: JSON.stringify(req.body.Engagment_data.selected.response_rate) ?? '',
      response_rate_value: req.body.Engagment_data.values.value_of_response_rate ?? '',

      is_there_a_need_currently: JSON.stringify(req.body.Fitwith_data.selected.is_there_need) ?? '',
      is_there_a_need_currently_value: req.body.Fitwith_data.values.value_of_is_there_need ?? '',
      use_case_alignment: JSON.stringify(req.body.Fitwith_data.selected.use_case_alignment) ?? '',
      use_case_alignment_value: req.body.Fitwith_data.values.value_of_use_case_alignment ?? '',
      is_lead_unhappy_with_current_solution: JSON.stringify(req.body.Fitwith_data.selected.unhappy_with_current) ?? '',
      is_lead_unhappy_with_current_solution_value: req.body.Fitwith_data.values.value_of_unhappy_with_current ?? '',
      did_they_signup_for_trial: JSON.stringify(req.body.Fitwith_data.selected.signup_trial) ?? '',
      did_they_signup_for_trial_value: req.body.Fitwith_data.values.value_of_signup_trial ?? '',
      feedback_provided: JSON.stringify(req.body.Fitwith_data.selected.feedback) ?? '',
      feedback_provided_value: req.body.Fitwith_data.values.value_of_feedback ?? '',

      qualified_or_unqualified_lead: JSON.stringify(req.body.LeadLife_data.selected.qualified_or_unqualified_lead) ?? '',
      qualified_or_unqualified_lead_value: req.body.LeadLife_data.values.value_of_qualified_or_unqualified_lead ?? '',

      lead_source: JSON.stringify(req.body.SourceOfLead_data.selected.lead_source) ?? '',
      lead_source_value: req.body.SourceOfLead_data.values.value_of_lead_source ?? ''
    }
    console.log(data)

    const create_lead_score = await LeadScore.create(data);
    return res.json({message:'lead score created successfully',statusCode:200,data:create_lead_score})
  } catch (error) {
    return res.json({message:error.message,statusCode:500})
  }
}

exports.get_lead_scoring_rules = async(req,res)=>{
  try {
    const find_lead_score = await LeadScore.findOne()
    return res.json({message:'lead score found',statusCode:200,data:find_lead_score??{}})
  } catch (error) {
    return res.json({message:error.message,statusCode:500})
    
  }
}
