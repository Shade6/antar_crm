const db = require("../../models");
const Users = db.users;
const Leads = db.leads;
const opportunity = db.opportunity;
const Product = db.product;
const Territory = db.territory;
const Industry = db.industry;
const Estimate = db.estimate;



exports.dashboard_header = async (req, res) => {
  try {
    let total_new_lead = 0;
    let total_new_opportunity = 0;
    let closed_opportunity = 0;
    let project_revenue = 0;

    const find_new_lead = await Leads.findAll({ where: {} });
    const new_opportunity = await opportunity.findAll({ where: {} });
    const find_closed_opportunity = await opportunity.findAll({
      where: { status: "closed" },

    });
    const find_win_opportunity = await opportunity.findAll({
      where: { status: "win" },
    });

  const find_map_opportunity = await find_win_opportunity.map((val)=>val.opportunity_id)
    const find_estimate = await Estimate.findAll({where:{opportunity_id:find_map_opportunity}})

    const total_value = find_estimate.reduce((sum,valueiojoafisdjf))
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.find_dashboard = async (req, res) => {
  try {
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
