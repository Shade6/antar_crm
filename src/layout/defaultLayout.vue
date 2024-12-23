<script setup>
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';  // Import useRoute to watch route changes
import Header from '@/components/layouts/header.vue';
import Navbar from '@/components/layouts/navbar.vue';
import "@/assets/toast.css"
import { useToast } from "vue-toast-notification";
const toast = useToast();
const route = useRouter();  // Access the current route

// Define the function to be triggered on route change
const onRouteChange = () => {
   const have_token = localStorage.getItem('token')
   if(!have_token){
      route.push('/login')
      toast.error("please login", {
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
};

// Watch the route for changes
watch(route, (newRoute, oldRoute) => {
  onRouteChange();  // Call the function on route change
});
onMounted(onRouteChange)
</script>

<template>
  <div class="flex">
    <Header />
    <div class="w-full">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>
