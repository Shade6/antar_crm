<script setup lang="ts">
import { useRouter } from "vue-router";  

const route = useRouter()
const handle_ =(data)=>{
    route.push(data)
}
</script>

<template>
    <div class="flex gap-4">
         <button class="p-3 boarder " @click="handle_('/')">home</button>
         <button class="p-3 boarder " @click="handle_('/about')">about</button>
         <button class="p-3 boarder " @click="handle_('/list')">list</button>
    </div>
</template>

<style lang="scss" scoped>

</style>