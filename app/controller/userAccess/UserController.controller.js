const field_checker = require("../../utils/validate_body");
const db = require("../../models");
const Users = db.users;
const Role = db.role;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const Address = db.address;

exports.create_user = async (req, res) => {
  try {
    const { email, password, role_id, first_name, last_name, enabled } =
      req.body;
      const tenant_id = req.tenant
      const validation = field_checker.checkNullValues({
        email: email,
        role: role_id,
      });

    if (!validation.isValid) {
      return res.json({
        message: `${validation.field} cannot be null`,
        statusCode: 400,
      });
    }

    if (!emailValidator.validate(email)) {
      return res.json({
        message: "invalid email ! please check the email",
        statusCode: 400,
      });
    }
    const find_user_exist = await Users.findOne({ where: { email: email ,tenant_id:tenant_id } });
    if (find_user_exist) {
      return res.json({
        message: "user email already exist choose another email !",
        statusCode: 400,
      });
    }
    // const hashedPassword = bcrypt.hashSync(password, 10);

    const create = await Users.create({
      first_name: first_name ?? "",
      last_name: last_name ?? "",
      email: email ?? "",
      role_id: role_id,
      tenant_id:tenant_id,
      // password:hashedPassword,
      created_by: 1,
      created_at: new Date(),
    });
    if (!create) {
      return res.json({ message: create, statusCode: 400 });
    }
    return res.json({
      message: "user created successfully",
      statusCode: 200,
      data: create,
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validation = field_checker.checkNullValues(req.body);
    if (!validation.isValid) {
      return res.json({
        message: `${validation.field} cannot be null`,
        statusCode: 400,
      });
    }
    const find_user_with_email = await Users.findOne({
      where: { email: email  },
    });
    if (!find_user_with_email) {
      return res.json({ message: "Email is invalid !", statusCode: 400 });
    }

    const isMatch = await bcrypt.compare(
      password,
      find_user_with_email.password
    );
   if(!find_user_with_email?.tenant_id){
    return res.json({message:'not registered to subscription',statusCode:400})
   }
    if (isMatch) {
      const token = jwt.sign(
        {
          user_id: find_user_with_email.user_id,
          role_id: find_user_with_email.role_id,
          tenant_id: find_user_with_email.tenant_id
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "5d",
        }
      );

      return res.send({
        status: "success",
        message: "Login Success",
        user_id: find_user_with_email.user_id,
        role_id: find_user_with_email.role_id,
        token: token,
        landing:'dashboard'
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
};

exports.update_user = async (req, res) => {
  try {
    res.json({ message: "updation on maintanance", statusCode: 200 });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};
exports.get_user = async (req, res) => {
  try {
    const user_id = req.query.u_id;
    const tenant_id = req.tenant
    if (!user_id) {
      return res.json({ message: "user not found", statusCode: 400 });
    }

    const find_user = await Users.findOne({
      where: { user_id: user_id,tenant_id:tenant_id },
      include: {
        model: Role,
        as: "role",
      },
    });
    if (!find_user) {
      return res.json({ message: "user not found", statusCode: 400 });
    }
    res.json({ message: "user found", statusCode: 200, data: find_user });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.find_all_user = async (req, res) => {
  const tenant_id = req.tenant
  try {
    const find_users = await Users.findAll({where:{
      tenant_id:tenant_id
    },
      attributes: [
        "user_id",
        "first_name",
        "last_name",
        "email",
        "profile",
        "created_at",
      ],
      include: { model: Role, as: "role" },
    });

    res.json({
      message: "user find successful",
      statusCode: 200,
      data: find_users ?? [],
    });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.delete_user = async (req, res) => {
  try {
    res.json({ message: "delete user on maintanance", statusCode: 200 });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};


exports.get_user_address = async (req, res) => {
  try {
   console.log(req.user)
    const userAddress = await Address.findAll({ where: { user_id: req.user ,status:false} });

    if (!userAddress || userAddress.length === 0) {
      return res.json({ message: "No addresses found for this user", statusCode: 404 });
    }

    res.json({ message: "User addresses retrieved successfully", statusCode: 200, data: userAddress });
  } catch (error) {
    res.json({ message: error.message, statusCode: 500 });
  }
};

exports.create_user_address = async (req, res) => {
  try {
    const { address_title, address_type, address_line_one, address_line_two, city_town, state_province, country, postal_code } = req.body;
   
    
    const newAddress = await Address.create({
      address_title: address_title,
      address_type: address_type.value,
      address_line_1: address_line_one,
      address_line_2: address_line_two,
      city: city_town,
      state: state_province,
      country: country,
      zip_code: postal_code,
      user_id: req.user,
      status:false
    });

    res.json({ message: "User address created successfully", statusCode: 200, data: newAddress });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message, statusCode: 500 });
  }
};
