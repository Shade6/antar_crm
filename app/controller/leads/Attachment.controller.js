const db = require("../../models");
const Attachment = db.lead_attachment;
const Users = db.users;
const Leads = db.leads;

exports.create = async (req, res) => {
  try {
    let title = null;
    let lead_id = null;

    if (!req.file) {
      if (!req.body.title) {
        return res.json({ message: "title is required", statusCode: 400 });
      }
      if (!req.body.lead_id) {
        return res.json({ message: "lead_id is required", statusCode: 400 });
      }
      title = req.body.title;
      lead_id = req.body.lead_id;
    } else {
      if (!req.query.lead_id) {
        return res.json({ message: "lead_id is required", statusCode: 400 });
      }
      title = req.file.filename;
      lead_id = req.query.lead_id;
    }

    const create_ = await Attachment.create({
      lead_id: lead_id,
      title: title,
      user_id: req.user,
      created_at: new Date(),
    });

    if (!create_) {
      return res.json({ message: create_, statusCode: 400 });
    }

    res.json({ message: "attachment created", statusCode: 200, data: create_ });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.update = async (req, res) => {
  try {
  } catch (error) {}
};
exports.get_one = async (req, res) => {
  try {
  } catch (error) {}
};
exports.get_all = async (req, res) => {
  try {
  } catch (error) {}
};
exports.get_by_lead_id = async (req, res) => {
  try {
    const lead_id = req.query.lead_id;
    const find_by_id = await Attachment.findAll({
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
      message: "lead attachment found",
      statusCode: 200,
      data: find_by_id ?? [],
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.delete_lead_attachment = async (req, res) => {
  try {
    const lead_attachment_id = req.query.id;
    if (!lead_attachment_id) {
      return res.json({
        message: "lead_attachment_id is required",
        statusCode: 400,
      });
    }
    const find_by_id = await Attachment.findOne({
      where: { lead_attachment_id: lead_attachment_id },
    });
    if (!find_by_id) {
      return res.json({
        message: "lead attachment not found",
        statusCode: 400,
      });
    }
    const delete_attachment = await Attachment.destroy({
      where: { lead_attachment_id: lead_attachment_id },
    });
    return res.json({
      message: "lead attachment deleted",
      statusCode: 200,
      data: delete_attachment,
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
