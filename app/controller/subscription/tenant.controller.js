const db = require("../../models");
const Tenant = db.tenant;
const Subscription = db.subscription;
const Plan = db.plan;
const moment = require("moment");

const Users = db.users
const bcrypt = require("bcrypt");

exports.createTenant = async (req, res) => {
  console.log(req.body);
  const {
    contact,
    password,
    confirmPassword,
    email,
    organization_name,
    subscription_plan,
    user_name
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
    // Create the tenant
    const tenant = await Tenant.create({
      organizationName: organization_name,
      workEmail: email,
      contactNumber: contact,
      subscriptionPlan: subscription_plan,
    });

    // Get the Free Plan (30-day trial)
    const freePlan = await Plan.findOne({
      where: { plan_id: subscription_plan },
    });

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
    await Users.create({
        tenant_id:tenant.tenant_id,
        first_name:splitName(user_name)?.firstName,
        last_name:splitName(user_name)?.lastName,
        email:email,
        password:hashedPassword,
        role_id:'be0f3272-9112-43b0-8df4-b9f20b6dcac5',
        created_at:new Date()
    })

    res
      .status(200)
      .json({
        message: "organization created and subscription activated",
        statusCode: 200,
      });
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: error.message, statusCode: 400 });
  }
};
