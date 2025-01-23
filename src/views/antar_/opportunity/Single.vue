<script setup>
import { ref } from "vue";
import Nav from "./nav/Nav.vue";
const tabsWidth = ref(70);
const sidebarWidth = ref(30);
const startResizing = () => {
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResizing);
};

const resize = (e) => {
  const percentage = (e.clientX / window.innerWidth) * 100;
  console.log(percentage);
  if (percentage > 60 && percentage < 80) {
    tabsWidth.value = percentage;
    sidebarWidth.value = 100 - percentage;
  }
};

const stopResizing = () => {
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResizing);
};
</script>

<template>
  <Nav></Nav>
  <div class="px-4">
    <div class="flex h-[675px]">
      <!-- Tabs Component -->
      <div
        class="flex-grow h-[98%] bg-red-100 p-3"
        :style="{ width: tabsWidth + '%' }"
      >
            
      </div>

      <!-- Resizable Handle -->
      <div
        class="cursor-col-resize bg-gray-400 w-1 h-[98%]"
        @mousedown="startResizing"
      ></div>

      <!-- Resizable Sidebar -->
      <div class="h-[98%] bg-blue-400 p-3" :style="{ width: sidebarWidth + '%' }">
        safsdfasd
      </div>
    </div>
  </div>
</template>

<style scoped></style>
