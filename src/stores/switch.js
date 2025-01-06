import { ref } from "vue";
import { defineStore } from "pinia";

export const useSwitchStore = defineStore("switch", () => {
  // State
  const page = ref(""); // Default value
  const notification = ref(false);
  const profileView = ref(null);
  const menu = ref([])
  const pageId = ref(null)
  const create_form = ref(null)

  const changeCreateForm =(data)=>{
    create_form.value = data
  }
  // Actions
  const changeProfileView = (data) => {
    profileView.value = data;
  };
  const changeNotification = () => {
    notification.value = !notification.value;
  };
  const changePage = (data) => {
    page.value = data.module_name;
    pageId.value = data.module_id;
  };
 const AddMenu = (data)=>{
  menu.value = data
 }
 const AddPageId=(data)=>{
  pageId.value = data
 }
 const clearPersist = () => {
  localStorage.removeItem("switch-store"); // Remove stored data
  page.value = "Leads"; // Reset page to default
  menu.value = []; // Clear menu
};
  return {
    AddPageId,
    pageId,
    page,
    changePage,
    notification,
    changeNotification,
    profileView,
    changeProfileView,
    AddMenu,
    menu,
    clearPersist,
    changeCreateForm,
    create_form
  };
}, {
  persist: {
    enabled: true, 
    strategies: [
      {
        key: "switch-store", // Key for storage
        storage: localStorage, // Store data in localStorage
        paths: ["page","pageId","menu"], // Persist only the 'page' state
      },
    ],
  },
});
