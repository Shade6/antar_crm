<script setup>
    import PostDetails from '@/components/antar_ui/createpost/PostDetails.vue';
    import PostTo from '@/components/antar_ui/createpost/PostTo.vue';
    import PreView from '@/components/antar_ui/createpost/PreView.vue';
</script>

<template>
    <div class="p-5 ">
        <PostTo/>
        <div class="flex">
            <PostDetails/>
            <PreView/>
        </div>
        
    </div>
</template>

<style  scoped>

</style>