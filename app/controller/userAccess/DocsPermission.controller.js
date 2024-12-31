const field_checker = require("../../utils/validate_body");
const db = require("../../models");
const DocPerm = db.docs_perm;

exports.create_docs_permission = async (req, res) => {
  try {
    const {
      doc_perm_name,
      doc_status,
      if_owner,
      email,
      perm_level,
      read,
      write,
      create_,
      delete_,
      submit,
      cancel,
      amend,
      report,
      import_,
      export_,
      share,
      print,
      role,
      docs
    } = req.body;
   
    const validation = field_checker.checkNullValues(req.body);
    if (!validation.isValid) {
      return res.json({
        message: `${validation.field} is required`,
        statusCode: 400,
      });
    }
    const find_doc_perm_name_exist = await DocPerm.findOne({
      where: { doc_perm_name: doc_perm_name },
    });
    if (find_doc_perm_name_exist) {
      return res.json({
        message: "docs permission name is already exist !",
        statusCode: 400,
      });
    }

    const create = await DocPerm.create({
      doc_perm_name: doc_perm_name ??'',
      doc_status: doc_status ?? '',
      if_owner: if_owner ??false,
      email: email ?? '',
      perm_level: perm_level ?? '',
      read: read ?? false,
      write: write ?? false,
      create: create_ ?? false,
      delete: delete_ ?? false,
      submit: submit ?? false,
      cancel: cancel ?? false,
      amend: amend ?? false,
      report: report ?? false,
      import: import_ ?? false,
      export: export_ ?? false,
      share: share ?? false,
      print: print ?? false,
      role_id:role,
      doc_id:docs,
      created_by: 1,
      created_at: new Date(),
    });

    if(!create){
        return res.json({message:create,statusCode:400,data:create})
    }
    return res.json({message:'docs permission created successfully',statusCode:200,data:create})
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
exports.update_docs_permission = async(req,res)=>{
    try {
        res.json({ message: 'updation on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}
exports.get_docs_permission = async(req,res)=>{
    try {
        res.json({ message: 'single on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.find_all_docs_permission = async(req,res)=>{
    try {
        res.json({ message: 'finding all   on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.delete_docs_permission= async(req,res)=>{
    try {
        res.json({ message: 'delete on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}