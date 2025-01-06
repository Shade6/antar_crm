const field_checker = require("../utils/validate_body");
const db = require("../models");
const Leads = db.leads;
const Users = db.users;
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
    console.log('start ---------')
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
 
    const find_owner = await Users.findOne({where:{user_id:owner_id.value}});

    if(!find_owner){
        return res.json({message:'owner not found',statusCode:400})
    }
    console.log('emd ---------')
    const create_ = await Leads.create({
      salutation: salutation.value??"",
      name: first_name + " " + last_name,
      lead_name:find_owner.first_name ?? "" + " " + find_owner.last_name ?? " ",
      company: organization??null,
      contact: mobile ?? null,
      email: email??null,
      gender: gender.value??null,
      website: website??null,
      status: status.value??null,
      employees: employees.value??null,
      territory_id: territory_id.value??null,
      industry_id: industry_id.value??null,
      revenue:revenue,
      created_at: new Date(),
      updated_at: new Date(),
    });
    if (create_) {
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
  const find_all = await Leads.findAll()
  return res.json({message:'leads found',statusCode:200,data:find_all??[]})
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};
