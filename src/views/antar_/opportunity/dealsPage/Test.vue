<template>
  <div ref="supersetContainer" id="superset" style="width: 100%; height: 100vh;"></div>
  </template>
   
  <script setup>
  import { ref, onMounted } from "vue";
  import { embedDashboard } from "@superset-ui/embedded-sdk";
  import {} from "@/api/userApi.js"
  const supersetContainer = ref(null);
  onMounted(async () => {
    await embedDashboard({
      id: "d3a5987f-ed4f-4850-bac1-068fcac70d09",
      supersetDomain: "https://superset.shade6.com",
      mountPoint: supersetContainer.value,
      fetchGuestToken: async () => {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidGVuYW50XzEyMyIsImZpcnN0X25hbWUiOiJUZW5hbnQiLCJsYXN0X25hbWUiOiIxMjMifSwicmVzb3VyY2VzIjpbeyJ0eXBlIjoiZGFzaGJvYXJkIiwiaWQiOiIyIn1dLCJybHNfcnVsZXMiOlt7ImNsYXVzZSI6InRlbmFudF9pZCA9ICcxMjMnIn1dLCJpYXQiOjE3MzkyODY2MDMuMTg3MzM0LCJleHAiOjE3MzkyODY5MDMuMTg3MzM0LCJhdWQiOiJodHRwOi8vMC4wLjAuMDo4MDgwLyIsInR5cGUiOiJndWVzdCJ9.3BwqOBO_evO8NNV8bR_kU1Aw9feoJgTsvNkxDUPHq04"; // Replace with actual token from backend
      },
      dashboardUiConfig: {
        hideTitle: false,
        hideChartControls: true,
      },
    });
  });
  </script>
   
  <style >
  #superset iframe{
    width:100%;
    height: 100%;
  }
  </style>