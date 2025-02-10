<template>
    <button>
        
    </button>
    <iframe 
        :src="`https://superset.shade6.com/embedded_dashboard/${dashboardId}?token=${jwtToken}`"
        width="100%"
        height="800px"
        frameborder="0"
    ></iframe>
    </template>
     
    <script>
    export default {
      data() {
        return {
          dashboardId: "1",
          jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzM5MDMyMTI3LCJqdGkiOiI0MWZjZjVlYi03YjE3LTRmYWEtOTg1Ny04Mzc0MGRiMDAzMWIiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE3MzkwMzIxMjcsImNzcmYiOiJjODhkNWFlMS05YTAxLTRjNTMtYTgxMi01ZDM3NWE5YzdhZTgiLCJleHAiOjE3MzkwMzMwMjd9.lt7huKA--FNujRc5OajmqJnqLyvxM4lWzro2d_r8ibs"
        };
      },
      async mounted() {
        const tenantId = '70c5e766-84f7-40df-97a8-180ac557ffda'; // Get from user session
        const response = await fetch(`https://superset.shade6.com/api/get-tenant-dashboard?tenant_id=${tenantId}`);
        const data = await response.json();
        this.dashboardId = data.dashboardId;
      }
    };
    </script>