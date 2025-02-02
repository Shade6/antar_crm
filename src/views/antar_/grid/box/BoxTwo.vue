<script setup>
const props = defineProps({
  total: {
    type: Number,
    default: 0,
    required:true
  }
  })
</script>

<template>
 <div class="bg-gray-200  border-black-2 h-full w-full flex flex-col justify-center items-center">
      <span class="font-bold text-gray-600">Total New Opportunity </span>
     
       <span class="font-bold text-black">{{ total }}</span>
    </div>
</template>

<style scoped>

</style>