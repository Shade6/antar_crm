<script setup>
import {ref} from "vue"
import TerritoryList from '@/components/antar_ui/settings/TerritoryList.vue'
import IndustryList from '@/components/antar_ui/settings/IndustryList.vue'
const page = ref(null)
 const handle_list_territory=()=>{
    page.value = "territory_list"
 }
 const handle_list_industry = ()=>{
    page.value = "industry_list"
 }
 const handle_back =()=>{
    page.value = null
 }
</script>

<template>
    <div v-if="page == null" class="p-10 flex gap-5">
         <div @click="handle_list_territory" class="p-5 rounded-sm shadow-lg w-64 flex justify-between">
             <span>Territory</span>
             <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up-right"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </div>
         </div>
         <div @click="handle_list_industry" class="p-5 rounded-sm shadow-lg w-64 flex justify-between">
            <span>Industry</span>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up-right"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </div>
         </div>
    </div>

    <div v-else-if="page == 'territory_list'">
       <TerritoryList @go_back ="handle_back"/>
    </div>
    <div v-else-if="page == 'industry_list'">
       <IndustryList @go_back ="handle_back"/>
    </div>

</template>

<style  scoped>

</style>