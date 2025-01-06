<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router"; // Import useRoute to watch route changes
import Header from "@/components/layouts/header.vue";

import NotificationSideBar from "@/components/layouts/NotificationSideBar.vue";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const route = useRouter(); // Access the current route
import { useSwitchStore } from "@/stores/switch";
const switchStore = useSwitchStore();

// Define the function to be triggered on route change
const onRouteChange = () => {
  const have_token = localStorage.getItem("token");
  if (!have_token) {
    route.push("/login");
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

watch(route, (newRoute, oldRoute) => {
  onRouteChange(); 
});
onMounted(onRouteChange);
</script>

<template>
  <div class="flex">
    <Header />
    <div class="w-full flex">
      <transition name="slide">
        <div
          v-if="switchStore.notification"
          class="w-[30%] h-full bg-gray-100 p-4"
        >
          <NotificationSideBar />
        </div>
      </transition>
      <div :class="switchStore.notification ? 'w-[70%]' : 'w-[100%]'">
       
        <RouterView />
      </div>
    </div>
  </div>
</template>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
