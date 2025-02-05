const db = require("../../models");
const Tenant = db.tenant;
const Subscription = db.subscription;
const Plan = db.plan;
const moment = require("moment");
const Role = db.role;
const Users = db.users;
const ModulePermission = db.module_permission;
const Module = db.module;
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

exports.createTenant = async (req, res) => {
  console.log(req.body);
  const {
    contact,
    password,
    confirmPassword,
    email,
    organization_name,
    subscription_plan,
    user_name,
  } = req.body;

  try {
    if (!organization_name) {
      return res.json({
        message: "please enter organization name",
        statusCode: 400,
      });
    }
    if (!contact) {
      return res.json({ message: "please enter contact", statusCode: 400 });
    }
    if (!password) {
      return res.json({ message: "please enter password", statusCode: 400 });
    }
    if (!confirmPassword) {
      return res.json({
        message: "please enter confirm password",
        statusCode: 400,
      });
    }

    if (password != confirmPassword) {
      return res.json({
        message: "confirm password not matching",
        statusCode: 400,
      });
    }
    const find_email = await Users.findOne({ where: { email: email } });
    if (find_email) {
      return res.json({ message: "email already in use", statusCode: 400 });
    }

   
    const freePlan = await Plan.findOne({
      where: { plan_id: subscription_plan },
    });

    if(!freePlan){
      return res.json({message:'plan not found',statusCode:400})
    }
    // Create the tenant
    const tenant = await Tenant.create({
      organizationName: organization_name,
      workEmail: email,
      contactNumber: contact,
      subscriptionPlan: subscription_plan,
    });

    // Get the Free Plan (30-day trial)


    // Create a subscription for the tenant with the free plan
    await Subscription.create({
      tenant_id: tenant.tenant_id,
      plan_id: freePlan.plan_id,
      subscription_type: "monthly",
      start_date: moment().format("YYYY-MM-DD"),
      end_date: moment().add(30, "days").format("YYYY-MM-DD"),
      status: "active",
    });
    const hashedPassword = bcrypt.hashSync(password, 10);
    function splitName(name) {
      const parts = name.trim().split(" ");

      if (parts.length > 1) {
        return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
      } else {
        const mid = Math.ceil(name.length / 2);
        return { firstName: name.slice(0, mid), lastName: name.slice(mid) };
      }
    }


    const create_role = await Role.create({
      tenant_id: tenant.tenant_id,
      role_name: "system admin",
      role_type: "system admin",
      page_status: true,
      owner: true,
      is_active: true,
      is_deletable: false,
      created_by: '1',
      created_at: new Date(),
    });

// create user as system admin
    const user_create = await Users.create({
      tenant_id: tenant.tenant_id,
      first_name: splitName(user_name)?.firstName,
      last_name: splitName(user_name)?.lastName,
      email: email,
      password: hashedPassword,
      role_id: create_role.role_id,
      created_at: new Date(),
    });
    // create role as system admin for  user 

    await Users.update({role_id:create_role.role_id},{where:{user_id:user_create.user_id}})

    const find_all_modules = await Module.findAll({
      where: {
        [Op.or]: [{ docs_type: "crm" }, { docs_type: "user" }],
      },
    });
//create the multiple permissions for the system admin
    for (let name of find_all_modules) {
      await ModulePermission.create({
        tenant_id: tenant.tenant_id,
        module_perm_name: "system admin access",
        module_status: true,
        if_owner: true,
        email: tenant.workEmail,
        perm_level: "last level",
        role_id: create_role.role_id,
        module_id: name.module_id,
        read: true,
        create: true,
        delete: true,
        amend: true,
        export: true,
        import: true,
        created_by: user_create.user_id,
        created_at: new Date(),
      });
    }

    res.status(200).json({
      message: "organization created and subscription activated",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: error.message, statusCode: 400 });
  }
};
