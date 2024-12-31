const field_checker = require("../../utils/validate_body");
const db = require("../../models");
const Docs = db.docs;

exports.create_docs = async (req, res) => {
  try {
    const { doc_name, is_active } = req.body;
    const requiredFields = ["doc_name", "is_active"];

    const validation = field_checker.checkNullValues(req.body, requiredFields);
    if (!validation.isValid) {
      return res.json({
        message: `${validation.field} is required`,
        statusCode: 400,
      });
    }
    const find_name_exist = await Docs.findOne({where:{doc_name:doc_name}})
    if(find_name_exist){
        return res.json({message:'doc name already exists !',statusCode:400})
    }
    const create = await Docs.create({
      doc_name: doc_name,
      is_active: is_active,
      created_by: 1,
      created_at: new Date(),
    });
    if(!create){
        return res.json({message:create,statusCode:400})
    }
    return res.json({message:'docs created successfully',statusCode:200,data:create})
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
exports.update_docs = async(req,res)=>{
    try {
        res.json({ message: 'updation on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}
exports.get_docs = async(req,res)=>{
    try {
        res.json({ message: 'single on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.find_all_docs= async(req,res)=>{
    try {
        res.json({ message: 'finding all   on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.delete_docs= async(req,res)=>{
    try {
        res.json({ message: 'delete on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}