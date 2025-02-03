<script setup>
const props = defineProps({
  total: {
    type: Number,
    default: 0
  }
  })
</script>

<template>
  <div class="border   border-black-2 h-full w-full flex flex-col justify-center items-center">
      <span class="font-bold text-gray-600"> Closed Opportunity</span>
     
       <span class="font-bold text-black">{{ total?.closed}}</span>
    </div>
</template>

<style scoped>

</style>