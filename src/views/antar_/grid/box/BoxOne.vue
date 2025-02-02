<script setup>
const props = defineProps({
  total: {
    type: Number,
    default: 0
  }
  })
</script>

<template>
  <div class="bg-gray-200 border-2 border-black h-full w-full flex flex-col justify-center items-center">
    <span class="font-bold text-gray-600">Total New Leads</span>
    <span class="font-bold text-black">{{ total }}</span>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here if needed */
</style>