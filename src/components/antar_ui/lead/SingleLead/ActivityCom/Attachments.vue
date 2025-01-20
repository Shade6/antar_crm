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
       {{ props.details }}
    </div>
</template>

<style  scoped>

</style>