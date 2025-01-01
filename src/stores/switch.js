import { ref } from "vue";
import { defineStore } from "pinia";

export const useSwitchStore = defineStore("switch", () => {
  // State
  const page = ref(""); // Default value
  const notification = ref(false);
  const profileView = ref(null);
  const menu = ref([])

  // Actions
  const changeProfileView = (data) => {
    profileView.value = data;
  };
  const changeNotification = () => {
    notification.value = !notification.value;
  };
  const changePage = (data) => {
    page.value = data;
  };
 const AddMenu = (data)=>{
  menu.value = data
 }
 const clearPersist = () => {
  localStorage.removeItem("switch-store"); // Remove stored data
  page.value = "Leads"; // Reset page to default
  menu.value = []; // Clear menu
};
  return {
    page,
    changePage,
    notification,
    changeNotification,
    profileView,
    changeProfileView,
    AddMenu,
    menu,
    clearPersist
  };
}, {
  persist: {
    enabled: true, 
    strategies: [
      {
        key: "switch-store", // Key for storage
        storage: localStorage, // Store data in localStorage
        paths: ["page","menu"], // Persist only the 'page' state
      },
    ],
  },
});
