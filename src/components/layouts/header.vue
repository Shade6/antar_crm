<script setup>
import {ref,h,watch} from 'vue'
import "@/assets/style.css";
import CRMLogo from "@/components/icons/CRMLogo.vue"
import CollapseSidebar from "@/components/icons/CollapseSidebar.vue"
import OrganizationsIcon from "@/components/icons/OrganizationsIcon.vue"
import FileTextIcon from "@/components/icons/FileTextIcon.vue"
import {FeatherIcon} from 'frappe-ui'
import LeadsIcon from "@/components/icons/LeadsIcon.vue"
import DealsIcon from "@/components/icons/DealsIcon.vue"
import ContactsIcon from "@/components/icons/ContactsIcon.vue"
import TaskIcon from "@/components/icons/TaskIcon.vue"
import PhoneIcon from "@/components/icons/PhoneIcon.vue"
import Email2Icon from "@/components/icons/Email2Icon.vue"
import PinIcon from "@/components/icons/PinIcon.vue"









import { useRouter } from 'vue-router';
import { useSwitchStore } from '@/stores/switch';

const switchStore = useSwitchStore();
const router = useRouter();



const sidebarOpen = ref(true);
const handle_side_bar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
watch(()=>switchStore.page,(new_)=>{
  if(new_ == 'Leads'){
    router.push(`/antar_`);
  }else{
    router.push(`/antar_/${new_}`);
  }
 
})
</script>

<template>
  <div
    class="sidebar text-black h-screen relative  inline-block   transition-all duration-100"
    :class="{ 'hide-nav transition-all duration-100': sidebarOpen }"
  >
    <div class="sidebar__head"></div>

    <ul class="nav w-full text-lg h-[100%] ease-out transition-all duration-100 sticky  p-3 bg-gray-50">
      <li class="nav-item flex ">
        <CRMLogo class="w-[30px] h-[30px]" />
        
        <div class="nav-item__text m-0 text-xl mx-2 text-black">
           CRM
        </div>
      </li>
     
      <li @click="switchStore.changePage('Leads')" class="nav-item flex my-4">
        <div class="nav-item__icon ml-1">
          <!-- <AppsIcon /> -->
          <PinIcon />
        </div>
        <div class="nav-item__text m-0 text-sm mx-2">Notification</div>
      </li>
      <li @click="switchStore.changePage('Leads')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <!-- <AppsIcon /> -->
          <LeadsIcon />
        </div>
        <div class="nav-item__text m-0 text-sm mx-2">Leads</div>
      </li>
      <li @click="switchStore.changePage('deals')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <DealsIcon />
        </div>
        <div class="nav-item__text text-sm mx-2">Deals</div>
      </li>
      <li @click="switchStore.changePage('contacts')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <ContactsIcon />
        </div>
        <div class="nav-item__text text-sm mx-2">Contacts</div>
      </li>
      <li @click="switchStore.changePage('organizations')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <OrganizationsIcon />
        </div>
        <div class="nav-item__text text-sm mx-2">Organizations</div>
      </li>
      <li @click="switchStore.changePage('notes')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <FileTextIcon /> 
        </div>
        <div class="nav-item__text text-sm mx-2">Notes</div>
      </li>
      <li @click="switchStore.changePage('task')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-0">
          <TaskIcon />
        </div>
        <div class="nav-item__text  text-sm mx-2">Tasks</div>
      </li>
      <li @click="switchStore.changePage('call-logs')" class="nav-item flex my-2">
        <div class="nav-item__icon ">
          <PhoneIcon />
        </div>
        <div class="nav-item__text  text-sm mx-2">Call Logs</div>
      </li>
      <li @click="switchStore.changePage('email-template')" class="nav-item flex my-2">
        <div class="nav-item__icon ml-1">
          <Email2Icon />
        </div>
        <div class="nav-item__text  text-sm mx-2">Email Template</div>
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
  padding: 4px 4px;
  border-radius: 3%;
  color:#525252
 }
 li:hover{
   background-color: white;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px;
 }
</style>
