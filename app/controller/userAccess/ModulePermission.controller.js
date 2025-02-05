const field_checker = require("../../utils/validate_body");
const db = require("../../models");
const { query } = require("express");
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
    const tenant_id = req.tenant;
    const validation = field_checker.checkNullValues(req.body);
    if (!validation.isValid) {
      return res.json({
        message: `${validation.field} is required`,
        statusCode: 400,
      });
    }
    const find_module_perm_name_exist = await ModulePermission.findOne({
      where: { role_id: role_id, module_id: module_id, tenant_id: tenant_id },
    });
    if (find_module_perm_name_exist) {
      return res.json({
        message: "module permission is already exist !",
        statusCode: 400,
      });
    }

    const create = await ModulePermission.create({
      module_perm_name: module_perm_name ?? "",
      module_status: module_status ?? false,
      if_owner: if_owner ?? false,
      tenant_id: tenant_id,
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
    const tenant_id = req.tenant;
    const find_all_module_permissions = await ModulePermission.findAll({
      where: {
        tenant_id: tenant_id,
      },
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

exports.find_all_role_permissions = async (req, res) => {
  try {
    const role = req.query.role;
    const tenant_id = req.tenant
    const permission = await ModulePermission.findAll({
      where: { role_id: role ,tenant_id:tenant_id},
      include: [
        { model: Role, as: "role" },
        { model: Module, as: "module" },
      ],
    });

    res.json({
      message: "permission fetched",
      statusCode: 200,
      data: permission ?? [],
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.permission_giver = async (req, res) => {
  try {
    const { access, permission_id } = req.body;
    const tenant_id = req.tenant
    const validation = field_checker.checkNullValues(req.body);
    if (!validation.isValid) {
      return res.json({
        message: `${validation.field} is required`,
        statusCode: 400,
      });
    }

    const find_module_perm = await ModulePermission.findOne({
      where: { module_permission_id: permission_id,tenant_id:tenant_id },
    });
    if (!find_module_perm) {
      return res.json({
        message: "permission not found sorry!",
        statusCode: 400,
      });
    }

    if (access == "create") {
      find_module_perm.create = !find_module_perm.create;
    } else if (access == "delete") {
      find_module_perm.delete = !find_module_perm.delete;
    } else if (access == "read") {
      find_module_perm.read = !find_module_perm.read;
    } else if (access == "amend") {
      find_module_perm.amend = !find_module_perm.amend;
    } else if (access == "export") {
      find_module_perm.export = !find_module_perm.export;
    } else if (access == "import") {
      find_module_perm.import = !find_module_perm.import;
    } else {
      return res.json({ message: "access not found !", statusCode: 400 });
    }
    const sav = await find_module_perm.save();
    if (sav) {
      return res.json({
        message: "access updated",
        statusCode: 200,
        data: sav,
      });
    } else {
      return res.json({ message: sav, statusCode: 400 });
    }
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
