const field_checker = require("../../utils/validate_body");
const db = require("../../models")
const Role = db.role


exports.create_role=async(req,res)=>{
    try {
        const { role_name, role_type, page_status, page, owner, is_active } = req.body;
        const requiredFields = ['role_name', 'role_type'];
        const tenant_id = req.tenant
        const validation = field_checker.checkNullValues({role_name,role_type}, requiredFields);
        if (!validation.isValid) {
            return res.json({ 
                message: `${validation.field} is required`, 
                statusCode: 400 
            });
        }
      const find_role_name_exist = await Role.findOne({where:{role_name:role_name}})
      if(find_role_name_exist){
        return res.json({message:'role name already exists',statusCode:400})
      }

    const create=await Role.create({
        role_name:role_name,
        role_type:role_type ?? '',
        page_status:page_status ?? false,
        tenant_id:tenant_id,
        page:page ?? '',
        owner:owner ?? false,
        is_active:is_active ?? true,
        created_by:1,
        created_at:new Date()
    })
   if(!create){
    return res.json({message:create,statusCode:400})
   }

   return res.json({message:'role created successfully',statusCode:200,data:create})
    } catch (error) {
        res.json({message:error.message,statusCode:500})
    }
}
exports.update_role = async(req,res)=>{
    try {
        res.json({ message: 'updation on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}
exports.get_role = async(req,res)=>{
    try {
        res.json({ message: 'single on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.find_all_role= async(req,res)=>{
    try {
        const tenant_id = req.tenant
        const find_all_role = await Role.findAll({
            where:{
                tenant_id:tenant_id
              }
        })
        res.json({ message: 'roles find successful', statusCode: 200 ,data:find_all_role??[]});
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.delete_role= async(req,res)=>{
    try {
        res.json({ message: 'delete on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}