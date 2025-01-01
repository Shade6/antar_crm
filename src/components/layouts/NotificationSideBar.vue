<script setup >
 import { useSwitchStore } from '@/stores/switch';
 const switchStore = useSwitchStore();
</script>

<template>
    <div class="flex justify-between ">
        <span>
            Notification Component
        </span> 
        <button @click="switchStore.changeNotification()" class=" px-2 bg-gray-700 rounded-sm shadow-md text-white">
            close
        </button>
    </div>
</template>

<style scoped>

</style>