
const db = require("../models");
const Industry  = db.industry
const emailValidator = require('email-validator');
const Email = db.emails
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
  
        return res.json({message:'industry found',statusCode:200,data:find_all})

    } catch (error) {
        return res.json({message:error.message,statusCode:500}) 
    }
}

exports.create_email = async(req,res)=>{
  try {
  console.log(req.body)
  const {email} = req.body
  
      if (!emailValidator.validate(email)) {
         return res.json({message:'invalid email ! please check the email',statusCode:400})
      } 
   const find_e = await Email.findOne({where:{email:email}})
   if(find_e){
    return res.json({message:'email already exist ', statusCode:400})
   }

   const create_ = await Email.create({
    email:email,
    created_by:req.user,
    created_at:new Date()
   })
   if(!create_){
    return res.json({message:'email creation failed',statusCode:400})
   }

   res.json({message:'email created successfully',statusCode:200,data:create_})
  } catch (error) {
      return res.json({message:error.message,statusCode:500}) 
  }
}

exports.find_all_email = async(req,res)=>{
  try {
      const find_all = await Email.findAll({})

      return res.json({message:'email found',statusCode:200,data:find_all})

  } catch (error) {
      return res.json({message:error.message,statusCode:500}) 
  }
}
