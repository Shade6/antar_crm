const validate = require("../../utils/validate_body");
const db = require("../../models");
const Module = db.module;

exports.create_module = async (req, res) => {
  try {
    const { module_name, is_active } = req.body;
    console.log(req.body, "this is the body");
    const validation = await validate.checkNullValues(req.body);

    // If any field is null, return an error with the field name
    if (!validation.isValid) {
      return res.json({
        message: `${validation.field} cannot be null`,
        statusCode: 400,
      });
    }

    const find_model_name_exist = await Module.findOne({where:{module_name:module_name}})
    if(find_model_name_exist){
        return res.json({message:'module name already exists',statusCode:400})
    }
    const create = await Module.create({
      module_name: module_name,
      is_active: is_active,
      created_by: 1,
      created_at: new Date(),
    });
    if (!create) {
      return res.json({ message: create, statusCode: 400 });
    }
    return res.json({
      message: "module created successfully",
      statusCode: 200,
      data: create,
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.update_module = async(req,res)=>{
    try {
        res.json({ message: 'updation on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}
exports.get_module = async(req,res)=>{
    try {
        res.json({ message: 'single on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.find_all_module= async(req,res)=>{
    try {
        res.json({ message: 'finding all   on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.delete_module= async(req,res)=>{
    try {
        res.json({ message: 'delete on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}