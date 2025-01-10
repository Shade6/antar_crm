const db = require("../../models");
const LeadTask = db.lead_task;
const Users = db.users;
const Leads = db.leads;
exports.create = async (req, res) => {
  try {
    const { lead_id, user_id, title, description, type,big_status, task_data,task_status} = req.body;
    console.log(req.body)
    const user = req.user;
    if (!user) {
      return res.json({ message: "user not found", statusCode: 400 });
    }
    if (!lead_id) {
      return res.json({ message: "lead not found", statusCode: 400 });
    }
    if (!user_id) {
      return res.json({ message: "user  not selected", statusCode: 400 });
    }

    if (!title) {
      return res.json({ message: "title  not added", statusCode: 400 });
    }
    if (!type) {
      return res.json({ message: "type  not added", statusCode: 400 });
    }
    if(!task_data){
        return res.json({ message: "date  not added", statusCode: 400 });
    }
    if(!big_status){
        return res.json({ message: "choose low medium hard  ", statusCode: 400 });
    }
    if(!task_status){
      return res.json({ message: "task status is not selected", statusCode: 400 });
    }


    const creat_ = await LeadTask.create({
      lead_id: lead_id,
      user_id: user_id.val,
      title: title ?? "",
      description: description ?? "",
      type: type,
      big_status:big_status,
      task_date:task_data,
      created_by: user,
      created_at: new Date(),
      task_status:task_status
    });

    if (creat_) {
      return res.json({
        message: "lead task created successfully",
        statusCode: 200,
        data: creat_,
      });
    } else {
      return res.json({ message: creat_, statusCode: 400 });
    }
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.update = async (req, res) => {
  try {
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
exports.get_one = async (req, res) => {
  try {
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
exports.get_all = async (req, res) => {
  try {
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
exports.get_by_lead_id = async (req, res) => {
  try {
    const lead_id = req.query.lead_id;
    const find_by_id = await LeadTask.findAll({
      where: { lead_id: lead_id },
      include: [
        {
          model: Leads,
          as: "lead",
        },
        {
          model: Users,
          as: "user",
        },
      ],
    });
    return res.json({
      message: "lead task found",
      statusCode: 200,
      data: find_by_id ?? [],
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
