<script setup>
import {ref,h,watch} from 'vue'
import "@/assets/style.css";
import CRMLogo from "@/components/icons/CRMLogo.vue"
import CollapseSidebar from "@/components/icons/CollapseSidebar.vue"
import AppsIcon from "@/components/icons/AppsIcon.vue"
import ContactIcon from "@/components/icons/ContactIcon.vue"
import WebsiteIcon from "@/components/icons/WebsiteIcon.vue"
import DialpadIcon from "@/components/icons/DialpadIcon.vue"
import SettingsIcon from "@/components/icons/SettingsIcon.vue"
import OrganizationsIcon from "@/components/icons/OrganizationsIcon.vue"
import FileTextIcon from "@/components/icons/FileTextIcon.vue"
import {FeatherIcon} from 'frappe-ui'
import LeadsIcon from "@/components/icons/LeadsIcon.vue"
import TerritoryIcon from "@/components/icons/TerritoryIcon.vue"
import RightSideLayoutIcon from "@/components/icons/RightSideLayoutIcon.vue"
import CertificateIcon from "@/components/icons/CertificateIcon.vue"

import { useRouter } from 'vue-router';
import { useSwitchStore } from '@/stores/switch';

const switchStore = useSwitchStore();
const router = useRouter();



const sidebarOpen = ref(true);
const handle_side_bar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
watch(()=>switchStore.page,(new_)=>{
  if(new_ == 'dashboard'){
    router.push(`/antar_`);
  }else{
    router.push(`/antar_/${new_}`);
  }
 
})
</script>

<template>
  <div
    class="sidebar text-black h-screen relative  inline-block   transition-all duration-300"
    :class="{ 'hide-nav transition-all duration-300': sidebarOpen }"
  >
    <div class="sidebar__head"></div>

    <ul class="nav  text-lg h-[100%] ease-out transition-all duration-300 fixed  p-2 bg-gray-100">
      <li class="nav-item flex my-2">
        <CRMLogo class="w-[30px] h-[30px]" />
        
        <div class="nav-item__text m-0 text-sm mx-2">
           {{ switchStore?.page }}
        </div>
      </li>
      <li @click="switchStore.changePage('dashboard')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <AppsIcon />
        </div>
        <div class="nav-item__text m-0 text-sm mx-2">Dashboard</div>
      </li>
      <li @click="switchStore.changePage('campaigns')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <TerritoryIcon />
        </div>
        <div class="nav-item__text text-sm mx-2">Campaigns</div>
      </li>
      <li @click="switchStore.changePage('workflow')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <RightSideLayoutIcon />
        </div>
        <div class="nav-item__text text-sm mx-2">Workflows</div>
      </li>
      <li @click="switchStore.changePage('customer-journey')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <DialpadIcon />
        </div>
        <div class="nav-item__text text-sm mx-2">Customer Journeys</div>
      </li>
      <li @click="switchStore.changePage('audience-management')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <LeadsIcon />
        </div>
        <div class="nav-item__text text-sm mx-2">Audience Management</div>
      </li>
      <li @click="switchStore.changePage('content-library')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-0">
          <OrganizationsIcon />
        </div>
        <div class="nav-item__text  text-sm mx-2">Content Library</div>
      </li>
      <li @click="switchStore.changePage('analytics')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <FileTextIcon />
        </div>
        <div class="nav-item__text  text-sm mx-2">Analytics</div>
      </li>
      <li @click="switchStore.changePage('create-post')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <CertificateIcon />
        </div>
        <div class="nav-item__text  text-sm mx-2">Create Post</div>
      </li>
      <li @click="switchStore.changePage('settings')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <SettingsIcon/>
        </div>
        <div class="nav-item__text  text-sm mx-2">Settings</div>
      </li>
      
      <li class="nav-item flex my-3 absolute bottom-0">
        <button @click="handle_side_bar" class="p-0 m-0 flex ">
		        <CollapseSidebar class="h-4.5 ml-1 w-4.5 nav-item__icon   duration-300 ease-in-out my-auto" :class="{ '[transform:rotateY(180deg)]': sidebarOpen }"/>
            <div class="nav-item__text text-xs ">Collapse</div>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
 li{
  cursor: pointer;
  padding: 10px 4px;
  border-radius: 3%;
 }
 li:hover{
   background-color: rgb(233, 233, 233);
   box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px;
 }
</style>
