// stores/switch.js
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSwitchStore = defineStore('switch', () => {
  const page = ref('dashboard');
  const changePage = (data) => {
    page.value = data;
  };
  return { page, changePage };
});
