const db = require("../models");
const Territory = db.territory;

exports.create_territory = async (req, res) => {
  try {
    const { territory_name } = req.body;
    const tenant_id = req.tenant;
    if (!territory_name) {
      return res.json({
        message: "territory name cannot be empty",
        statusCode: 400,
      });
    }
    const find_name_exist = await Territory.findOne({
      where: { territory_name: territory_name, tenant_id: tenant_id },
    });
    if (find_name_exist) {
      return res.json({
        message: "territory name already exists",
        statusCode: 400,
      });
    }
    const Create_ = await Territory.create({
      territory_name: territory_name,
      tenant_id: tenant_id,
    });
    if (Create_) {
      return res.json({
        message: "territory created successfully",
        statusCode: 200,
        data: Create_,
      });
    } else {
      return res.json({ message: Create_, statusCode: 400 });
    }
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.find_all_territories = async (req, res) => {
  try {
    const tenant_id = req.tenant
    const find_all = await Territory.findAll({
        where:{
            tenant_id:tenant_id
          },
    });
    return res.json({
      message: "territory found",
      statusCode: 200,
      data: find_all ?? [],
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.find_one_territories = async (req, res) => {
  try {
    const territory_id = req.query.territory_id;
    const tenant_id = req.tenant
    if (!territory_id) {
      return res.json({ message: "cannot find territory ", statusCode: 400 });
    }

    const find_one = await Territory.findOne({
      where: { territory_id: territory_id ,tenant_id:tenant_id},
    });
    if (find_one) {
      return res.json({
        message: "territory found",
        statusCode: 200,
        data: find_one,
      });
    } else {
      return res.json({ message: "cannot find territory", statusCode: 400 });
    }
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.update_territory = async (req, res) => {
  try {
    const { territory_id, territory_name } = req.body;
    const tenant_id = req.tenant
    const find_one_territories = await Territory.findOne({
      where: { territory_id: territory_id ,tenant_id:tenant_id},
    });
    if (!find_one_territories) {
      return res.json({
        message: "territory not found ! updation failed",
        statusCode: 400,
      });
    }
    find_one_territories.territory_name = territory_name;

    find_one_territories.save();
    res.json({
      message: "territory updated ",
      statusCode: 200,
      data: find_one_territories,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};
