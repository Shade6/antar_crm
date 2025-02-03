<script setup >
  import {defineProps } from 'vue'
const props = defineProps({
  total: Number,
  required:true
});
</script>

<template>
  <div class="border   border-black-2 h-full w-full flex flex-col justify-center items-center">
      <span class="font-bold text-gray-600"> Projected Revenue</span>
     
       <span class="font-bold text-black">{{ props.total.revenue ||0}}</span>
    </div>
</template>

<style scoped>

</style>