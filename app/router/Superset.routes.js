module.exports = (app) => {
  const axios = require("axios");
  const tough = require("tough-cookie");
  const { wrapper } = require("axios-cookiejar-support");
  const cookieJar = new tough.CookieJar();
  const client = wrapper(axios.create({ jar: cookieJar }));

  const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzM5MDMyMTI3LCJqdGkiOiI0MWZjZjVlYi03YjE3LTRmYWEtOTg1Ny04Mzc0MGRiMDAzMWIiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3MzkwMzIxMjcsImNzcmYiOiJjODhkNWFlMS05YTAxLTRjNTMtYTgxMi01ZDM3NWE5YzdhZTgiLCJleHAiOjE3MzkwMzMwMjd9.lt7huKA--FNujRc5OajmqJnqLyvxM4lWzro2d_r8ibs";

  async function login_superset(req, res) {
    try {
      const response = await axios.post(
        "https://superset.shade6.com/api/v1/security/login",
        {
          username: process.env.SUPERSET_USERNAME,
          password: process.env.SUPERSET_PASSWORD,
          provider: "db",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const accessToken = response.data?.access_token;

      if (!accessToken) {
        return res.status(400).json({ error: "Authentication failed" });
      }
   

      const csrf_token_response = await csrf(accessToken);
      const guest_token_response = await guest_token_function({
        accessToken: accessToken,
        csrfToken: csrf_token_response,
        dashboardId: "2",
        tenantId: "123",
        username: "tenant_123",
      });

      console.log(csrf_token_response, guest_token_response);

      res.json({
        csrf_token: csrf_token_response,
        access_token: accessToken,
        gust_token: guest_token_response,
      });
    } catch (error) {
      console.error(
        "Error logging into Superset:",
        error?.response?.data || error
      );
      res.status(500).json({ error: "Failed to authenticate with Superset" });
    }
  }


  // csrf token generate
  const csrf = async (access_token) => {
    try {
      const accessToken = access_token;

      if (!accessToken) {
        return "access token not provided";
      }

      const response = await client.get(
        "https://superset.shade6.com/api/v1/security/csrf_token/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response,'00000000000000000');
      const csrfToken = response.data?.result;

      if (!csrfToken) {
        return "axios response from csrf_token creation failed ";
      }

      return csrfToken;
    } catch (error) {
      console.error(
        "Error fetching CSRF token:",
        error?.response?.data || error
      );
      return error.message;
    }
  };

  const guest_token_function = async (guest_token_information) => {
    try {
      const { accessToken, csrfToken, dashboardId, tenantId, username } =
        guest_token_information;
      console.log(guest_token_information, "=====");

      console.log(
        "accessToken",
        accessToken,
        "csrf token found in guest_token_function",
        csrfToken
      );

      if (
        !accessToken ||
        !csrfToken ||
        !dashboardId ||
        !tenantId ||
        !username
      ) {
        return "information not provided";
      }

      const response = await client.post(
        "https://superset.shade6.com/api/v1/security/guest_token/",
        {
          resources: [
            {
              type: "dashboard",
              id: dashboardId,
            },
          ],
          rls: [
            {
              clause: `tenant_id = '${tenantId}'`,
            },
          ],
          user: {
            username,
            first_name: "Tenant",
            last_name: tenantId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
            Referer: "https://superset.shade6.com/",
            
          },
        }
      );

      console.log(response, "this is the guest token response");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching guest token:",
        error?.response?.data || error
      );
      return error.message;
    }
  };

  var router = require("express").Router();

  router.post("/superset/login", login_superset);

  app.use("/api/v1/crm/", router);
};
