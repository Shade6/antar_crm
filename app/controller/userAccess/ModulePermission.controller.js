const field_checker = require("../../utils/validate_body");
const db = require("../../models");
const ModulePermission = db.module_permission;
const Role = db.role;
const Module = db.module;

exports.create_module_permission = async (req, res) => {
  try {
    const {
      module_perm_name,
      module_status,
      if_owner,
      email,
      perm_level,
      role_id,
      module_id,
      read,
      create_,
      delete_,
      amend,
    } = req.body;

    const validation = field_checker.checkNullValues(req.body);
    if (!validation.isValid) {
      return res.json({
        message: `${validation.field} is required`,
        statusCode: 400,
      });
    }
    const find_module_perm_name_exist = await ModulePermission.findOne({
      where: { role_id: role_id, module_id: module_id },
    });
    if (find_module_perm_name_exist) {
      return res.json({
        message: "module permission is already exist !",
        statusCode: 400,
      });
    }

    const create = await ModulePermission.create({
      module_perm_name: module_perm_name ?? "",
      module_status: module_status ?? "",
      if_owner: if_owner ?? false,
      email: email ?? "",
      perm_level: perm_level ?? "",
      read: read ?? false,
      create: create_ ?? false,
      delete: delete_ ?? false,
      amend: amend ?? false,
      role_id: role_id,
      module_id: module_id,
      created_by: 1,
      created_at: new Date(),
    });

    if (!create) {
      return res.json({ message: create, statusCode: 400, data: create });
    }
    return res.json({
      message: "module permission created successfully",
      statusCode: 200,
      data: create,
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.update_docs_permission = async (req, res) => {
  try {
    res.json({ message: "updation on maintanance", statusCode: 200 });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
exports.get_docs_permission = async (req, res) => {
  try {
    res.json({ message: "single on maintanance", statusCode: 200 });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.find_all_docs_permission = async (req, res) => {
  try {
    const find_all_module_permissions = await ModulePermission.findAll({
      include: [
        { model: Role, as: "role" },
        { model: Module, as: "module" },
      ],
    });
    res.json({
      message: "module permission retrived",
      statusCode: 200,
      data: find_all_module_permissions,
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.delete_docs_permission = async (req, res) => {
  try {
    res.json({ message: "delete on maintanance", statusCode: 200 });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
