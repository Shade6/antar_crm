const db = require("../models");
const Industry = db.industry;
const emailValidator = require("email-validator");
const Email = db.emails;
const UserEmail = db.user_email;
exports.create_industry = async (req, res) => {
  try {
    const { industry_name } = req.body;
    if (!industry_name) {
      return res.json({ message: "industry name cannot be empty" });
    }
    const find_name_exist = await Industry.findOne({
      where: { industry_name: industry_name },
    });
    if (find_name_exist) {
      return res.json({
        message: "industry name already exists",
        statusCode: 400,
      });
    }
    const create_ = await Industry.create({
      industry_name: industry_name,
    });
    if (create_) {
      return res.json({
        message: "industry created successfully",
        statusCode: 200,
        data: create_,
      });
    } else {
      return res.json({ message: create_, statusCode: 400 });
    }
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.find_all_industries = async (req, res) => {
  try {
    const find_all = await Industry.findAll({});

    return res.json({
      message: "industry found",
      statusCode: 200,
      data: find_all,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.create_email = async (req, res) => {
  try {
    console.log(req.body);
    const { details, incoming_data, outgoing_data } = req.body;
    console.log(details.address, "-----------");
    if (!emailValidator.validate(details.address)) {
      return res.json({
        message: "invalid email ! please check the email",
        statusCode: 400,
      });
    }
    const find_e = await Email.findOne({
      where: { email_address: details.address },
    });
    if (find_e) {
      return res.json({ message: "email already exist ", statusCode: 400 });
    }

    const create_ = await Email.create({
      email_address: details.address,
      service: details.service ?? "",
      auth_method: details.method ?? "",
      password: details.password ?? "",
      ascii_email: details.ascii ?? false,
      account_name: details.account_name ?? "",
      diff_email: details.diff_email ?? false,
      domain: details.domain ?? "",
      attachment_limit: incoming_data.attachment_limit ?? "",
      default_incoming: incoming_data.default_incoming ?? false,
      default_outgoing: outgoing_data.default_outgoing ?? false,
      incoming_use_imap: incoming_data.imap ?? "",
      incoming_use_ssl: incoming_data.ssl ?? "",
      incoming_validate_ssl: incoming_data.incoming_validate_ssl ?? false,
      // incoming_email_sync:incoming_data.incoming_email_sync??false,
      initial_sync_count: incoming_data.initial_sync_count ?? null,
      incoming_server: incoming_data.incoming_server ?? "",
      incoming_port: incoming_data.port ?? "",
      outgoing_use_lls: outgoing_data.outgoing_use_lls ?? false,
      outgoing_use_ssl: outgoing_data.ssl ?? false,
      outgoing_validate_ssl: outgoing_data.outgoing_validate_ssl ?? false,
      outgoing_server: outgoing_data.outgoing_server ?? "",
      outgoing_port: outgoing_data.port ?? "",
      track_email_status: outgoing_data.track_email_status ?? false,
      created_by: req.user,
      created_at: new Date(),
    });
    if (!create_) {
      return res.json({ message: "email creation failed", statusCode: 400 });
    }

    res.json({
      message: "email created successfully",
      statusCode: 200,
      data: create_,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.find_all_email = async (req, res) => {
  try {
    const find_all = await Email.findAll({});

    return res.json({
      message: "email found",
      statusCode: 200,
      data: find_all,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.find_user_created_email = async (req, res) => {
  try {
    const user = req.query.u_id;
    console.log(user, "ddd");
    const find_email = await Email.findAll({ where: { created_by: user } });
    return res.json({
      message: "email found",
      statusCode: 200,
      data: find_email,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.create_email_user_email = async (req, res) => {
  try {
    const {
      user_id,
      email_id,
      signature,
      send_notification,
      send_me_a_copy,
      allowed_in_mentions,

    } = req.body;
    console.log(req.body,'user')
    const find_email = await UserEmail.findOne({ where: { user_id: user_id } });
    if (find_email) {
      return res.json({ message: "email already exist", statusCode: 400 });
    }
    const find_user_email = await UserEmail.findOne({where:{user_id:user_id}})

    const create_ = await UserEmail.create({
      user_id: user_id,
      email_id: email_id.value,
      signature: signature??"",
      send_notification: send_notification,
      send_me_a_copy: send_me_a_copy,
      allowed_in_mentions: allowed_in_mentions,
      default_email: find_user_email ? false :true,
      created_by: req.user,
      created_at: new Date(),
    });
    return res.json({
      message: "email created",
      statusCode: 200,
      data: create_,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.find_selected_user_email = async (req, res) => {
  try {
    const id = req.query.user_id;
    const find_email = await UserEmail.findAll({ where: { user_id: id },include:{
      model:Email,
      as:'email'
    } });
    return res.json({
      message: "email found",
      statusCode: 200,
      data: find_email,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};
