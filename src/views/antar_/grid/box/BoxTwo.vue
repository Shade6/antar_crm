<script setup>
import {defineProps } from 'vue'
const props = defineProps({
  total: Number,
  required:true
});


</script>
<template>
 <div class="border p-4 border-black-2 h-full w-full flex flex-col justify-center items-center">
      <span class="font-bold text-gray-600">Total New Opportunity </span>
     
       <span class="font-bold text-black">{{ props.total.opportunity }}</span>
    </div>
</template>

<style scoped>

</style>