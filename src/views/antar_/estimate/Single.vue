<script setup >
  import { useRouter } from 'vue-router';
import Nav from './nav/Nav.vue';
  const router = useRouter()

  const product_id = router.currentRoute.value.hash.split("#")[1];



</script>

<template>
    <Nav></Nav>
    <div class="p-4">
        {{ product_id }}
    </div>
</template>

<style  scoped>

</style>