
const db = require('../models')
const ModulePermission = db.module_permission
exports.access_read=async(req,res,next)=>{
    try {
        const module_ = req.query.mdl
        const role = req.role


        if(!module_){
            return res.json({message:'sorry no access to this module',statusCode:400})
        }
        const find_module_permission_ = await ModulePermission.findOne({where:{module_id:module_,role_id:role}})
        if(!find_module_permission_){
            return res.json({message:'sorry access denied',statusCode:400})
        }
        
        if(find_module_permission_.read == true){
            next()
        }else{
            return res.json({message:'user restricted',statusCode:400})
        }

    
    } catch (error) {
        return res.json({message:error.message,statusCode:500})
    }
   
}

exports.access_create=async(req,res,next)=>{
    try {
        const module_ = req.query.mdl
        const user = req.user
        const role = req.role


        if(!module_){
            return res.json({message:'sorry no access to this module',statusCode:400})
        }
        const find_module_permission_ = await ModulePermission.findOne({where:{module_id:module_,role_id:role}})
        if(!find_module_permission_){
            return res.json({message:'sorry access denied',statusCode:400})
        }
        
        if(find_module_permission_.create == true){
            next()
        }else{
            return res.json({message:'user restricted',statusCode:400})
        }

    
    } catch (error) {
        return res.json({message:error.message,statusCode:500})
    }
   
}

exports.access_delete=async(req,res,next)=>{
    try {
        const module_ = req.query.mdl
        const user = req.user
        const role = req.role


        if(!module_){
            return res.json({message:'sorry no access to this module',statusCode:400})
        }
        const find_module_permission_ = await ModulePermission.findOne({where:{module_id:module_,role_id:role}})
        if(!find_module_permission_){
            return res.json({message:'sorry access denied',statusCode:400})
        }
        
        if(find_module_permission_.delete == true){
            next()
        }else{
            return res.json({message:'user restricted',statusCode:400})
        }

    
    } catch (error) {
        return res.json({message:error.message,statusCode:500})
    }
   
}

exports.access_amend=async(req,res,next)=>{
    try {
        const module_ = req.query.mdl
        const user = req.user
        const role = req.role


        if(!module_){
            return res.json({message:'sorry no access to this module',statusCode:400})
        }
        const find_module_permission_ = await ModulePermission.findOne({where:{module_id:module_,role_id:role}})
        if(!find_module_permission_){
            return res.json({message:'sorry access denied',statusCode:400})
        }
        
        if(find_module_permission_.amend == true){
            next()
        }else{
            return res.json({message:'user restricted',statusCode:400})
        }

    
    } catch (error) {
        return res.json({message:error.message,statusCode:500})
    }
   
}