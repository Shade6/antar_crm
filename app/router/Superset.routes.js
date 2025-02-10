module.exports = (app) => {
  const axios = require("axios");

  const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzM5MDMyMTI3LCJqdGkiOiI0MWZjZjVlYi03YjE3LTRmYWEtOTg1Ny04Mzc0MGRiMDAzMWIiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3MzkwMzIxMjcsImNzcmYiOiJjODhkNWFlMS05YTAxLTRjNTMtYTgxMi01ZDM3NWE5YzdhZTgiLCJleHAiOjE3MzkwMzMwMjd9.lt7huKA--FNujRc5OajmqJnqLyvxM4lWzro2d_r8ibs";

  async function createTenantInSuperset(req,res) {
    const tenantId = "70c5e766-84f7-40df-97a8-180ac557ffda"
    const userEmail = "www.vidhulprasad@gmail.com"
    
    try {
      // 1️⃣ Create Role
      console.log('starting the functions')
     const first = await axios.post(
        "https://superset.shade6.com/api/v1/roles/",
        {
          name: `Tenant_${tenantId}`,
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      console.log(first,'this is hte the first data')
     
      // 2️⃣ Create User
     const second = await axios.post(
        "https://superset.shade6.com/api/v1/user/",
        {
          username: `tenant${tenantId}_user`,
          first_name: "New",
          last_name: "Tenant",
          email: userEmail,
          role: [`Tenant_${tenantId}`],
          password: "securepassword",
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      console.log(second,'this is hte the second data')
      // 3️⃣ Apply RLS Rule
      const third = await axios.post(
        "https://superset.shade6.com/api/v1/rls/",
        {
          name: `Tenant_${tenantId}_RLS`,
          clause: `tenant_id = ${tenantId}`,
          tables: [1, 2], // IDs of the tables in Superset
          roles: [`Tenant_${tenantId}`],
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      console.log(`✅ Tenant ${tenantId} created successfully in Superset`);
      return res.json({message:`✅ Tenant ${tenantId} created successfully in Superset`,statusCode:200,data:tenantId})
    } catch (error) {
        return res.json({message:error.message,data: error.response?.data || error.message})
     
    }
  }

  var router = require("express").Router();

  router.post("/create_superset", createTenantInSuperset);

  app.use("/api/v1/crm/", router);
};
