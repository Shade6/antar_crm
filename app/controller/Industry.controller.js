
const db = require("../models");
const Industry  = db.industry
exports.create_industry =async(req,res)=>{
    try {
      const {industry_name} = req.body;
      if(!industry_name){
        return res.json({message:'industry name cannot be empty'})
      }
      const find_name_exist =  await Industry.findOne({where:{industry_name:industry_name}})
      if(find_name_exist){
        return res.json({message:'industry name already exists',statusCode:400})
      }
      const create_ = await Industry.create({
        industry_name:industry_name
      })
      if(create_){
        return res.json({message:'industry created successfully',statusCode:200,data:create_})
      }else{
        return res.json({message:create_,statusCode:400})
      }

    } catch (error) {
       return res.json({message:error.message,statusCode:500}) 
    }
}

exports.find_all_industries = async(req,res)=>{
    try {
        const find_all = await Industry.findAll({})
        console.log(find_all)
        return res.json({message:'industry found',statusCode:200,data:find_all})

    } catch (error) {
        return res.json({message:error.message,statusCode:500}) 
    }
}