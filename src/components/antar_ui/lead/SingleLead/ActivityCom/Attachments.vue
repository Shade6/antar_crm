<script setup >
  const props = defineProps({
    details: {
      type: Object,
      required: true,
    }
  });
</script>

<template>
    <div>
       <div class="flex items-center justify-between">
           
           <img :src="JSON.parse(props.details.change).title" alt="attachment" class="w-32 border bg-red-50 rounded-md">
       </div>
    </div>
</template>

<style  scoped>

</style>  