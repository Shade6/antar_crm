const db = require("../../models");
const LeadComment = db.lead_comment;
const Users = db.users;
const Leads = db.leads;

exports.create = async (req, res) => {
  try {
    const { lead_id, comment } = req.body;
    const user = req.user;

    if (!lead_id) {
      return res.json({ message: "lead is not found", statusCode: 400 });
    }
    if (!comment) {
      return res.json({ message: "comment is not added", statusCode: 400 });
    }
    if (!user) {
      return res.json({ message: "user is not added", statusCode: 400 });
    }
    const create_ = await LeadComment.create(
      {
        lead_id: lead_id,
        comment: comment,
        user_id: user,
        created_at: new Date(),
      },
      {
        tracker_id: req.tracker_id, // Pass extra ID through options
      }
    );

    if (!create_) {
      return res.json({ message: create_, statusCode: 400 });
    }

    res.json({
      message: "comment was created ",
      statusCode: 200,
      data: create_,
    });
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
    const find_by_id = await LeadComment.findAll({
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
      message: "lead comment found",
      statusCode: 200,
      data: find_by_id ?? [],
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.delete_lead_comment = async (req, res) => {
  try {
    const lead_ids = req.query.id;
    console.log(lead_ids);
    const find_lead_comment = await LeadComment.findOne({
      where: { lead_comment_id: lead_ids },
    });
    if (!find_lead_comment) {
      return res.json({ message: "lead comment not found", statusCode: 400 });
    }
    await LeadComment.destroy({
      where: { lead_comment_id: lead_ids },
      context: { tracker_id: req.tracker_id },
    });
    return res.json({
      message: "lead comment deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.update_lead_comment = async (req, res) => {
  try {
    const { comment_id, comment } = req.body;
    const find_lead_comment = await LeadComment.findOne({
      where: { lead_comment_id: comment_id },
    });
    if (!find_lead_comment) {
      return res.json({ message: "lead comment not found", statusCode: 400 });
    }
    await LeadComment.update(
      { comment: comment },
      {
        where: { lead_comment_id: comment_id },
        context: { tracker_id: req.tracker_id },
      }
    );
    return res.json({
      message: "lead comment updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
