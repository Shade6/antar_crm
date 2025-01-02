const field_checker = require("../../utils/validate_body");
const db = require("../../models");
const Users = db.users;
const Role = db.role
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

exports.create_user = async (req, res) => {
  try {
    const { email, password, role_id, first_name, last_name, enabled } =
      req.body;
    const validation = field_checker.checkNullValues({
      email: email,
      password: password,
      role :role_id
    });

    if (!validation.isValid) {
      return res.json({
        message: `${validation.field} cannot be null`,
        statusCode: 400,
      });
    }

    const find_user_exist = await Users.findOne({ where: { email: email } });
    if (find_user_exist) {
      return res.json({
        message: "user email already exist choose another email !",
        statusCode: 400,
      });
    }
  const hashedPassword = bcrypt.hashSync(password, 10);

    const create = await Users.create({
        first_name:first_name ?? '',
        last_name:last_name ?? '',
        email:email ?? '',
        role_id:role_id,
        password:hashedPassword,
        created_by:1,
        created_at:new Date()

    })
    if(!create){
        return res.json({message:create,statusCode:400})
    }
    return res.json({message:'user created successfully',statusCode:200,data:create})
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.login=async(req,res)=>{
    try {
        const {email,password} = req.body
        const validation = field_checker.checkNullValues(req.body);
          if (!validation.isValid) {
            return res.json({
              message: `${validation.field} cannot be null`,
              statusCode: 400,
            });
          }
        const find_user_with_email = await Users.findOne({where:{email:email}})
         if(!find_user_with_email){
            return res.json({message:'Email is invalid !',statusCode:400})
         }
        
         
    const isMatch = await bcrypt.compare(password, find_user_with_email.password);

    if (isMatch) {
      const token = jwt.sign({ user_id: find_user_with_email.user_id,role_id:find_user_with_email.role_id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "5d",
      });

      return res.send({
        status: "success",
        message: "Login Success",
        user_id: find_user_with_email.user_id,
        role_id: find_user_with_email.role_id,
        token: token,
      });
    } else {
      return res.send({
        status: "failed",
        message: "Email or Password does not match",
      });
    }
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.update_user = async(req,res)=>{
    try {
        res.json({ message: 'updation on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}
exports.get_user = async(req,res)=>{
    try {
        res.json({ message: 'get user on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.find_all_user = async(req,res)=>{
    try {
         const find_users = await Users.findAll({ attributes: ['user_id', 'first_name', 'last_name', 'email','profile','created_at'],include:{model:Role,as:'role'} })

        res.json({ message: 'user find successful', statusCode: 200 ,data:find_users??[]});
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.delete_user = async(req,res)=>{
    try {
        res.json({ message: 'delete user on maintanance', statusCode: 200 });
    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}