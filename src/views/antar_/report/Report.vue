<script setup>
  import Navbar from "./Navbar.vue"
  import {superset_login} from "@/api/userApi.js"
  import { ref, onMounted } from "vue";
  import { embedDashboard } from "@superset-ui/embedded-sdk";
  import "@/assets/toast.css";
  import { useToast } from "vue-toast-notification";
  const toast = useToast();
  const supersetContainer = ref(null);


  const handle_fetch_data =async()=>{
     const res = await superset_login()
     if(res.statusCode == 200){
        fetch_embed(res.gust_token.token)
     }else{
        toast.success(res.message, {
        position: "top-right",
        duration: 3000,
        dismissible: true,
        style: {
          background: "#FFF5F5",
          color: "black",
          padding: "4px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderLeft: "5px solid red",
        },
      });
     }
  }


  const fetch_embed = async(token)=>{
    await embedDashboard({
      id: "d3a5987f-ed4f-4850-bac1-068fcac70d09",
      supersetDomain: "https://superset.shade6.com",
      mountPoint: supersetContainer.value,
      fetchGuestToken: async () => {
        return token
      },
      dashboardUiConfig: {
        hideTitle: false,
        hideChartControls: true,
      },
    });
  }
onMounted(handle_fetch_data)

</script>

<template>
    <Navbar @refresh="handle_fetch_data"/>
    <div class="p-4">
        <div ref="supersetContainer" id="superset" style="width: 100%; height: 100vh;"></div>
    </div>
</template>

<style >
  #superset iframe{
    width:100%;
    height: 100%;
  }
</style>