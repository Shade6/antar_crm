<script setup>
import { ref, h } from "vue";
import User from "@/components/antar_ui/user/User.vue";
import Role from "@/components/antar_ui/user/Role.vue";
import Permission from "@/components/antar_ui/user/Permission.vue";
import ModuleVue from "@/components/antar_ui/user/ModuleVue.vue";



import UserNav from "@/components/antar_ui/user/nav/UserNav.vue"
import RoleNav from "@/components/antar_ui/user/nav/RoleNav.vue"
import PermissionNav from "@/components/antar_ui/user/nav/PermissionNav.vue"
import ModuleNav from "@/components/antar_ui/user/nav/ModuleNav.vue"




const action = ref(null);
const handle_action = (data) => {
  action.value = data;
};
const handle_back =()=>{
    action.value =null
}
</script>

<template>
  <UserNav @go_back="handle_back" v-if="action == 'user'"/>
  <RoleNav @go_back="handle_back" v-if="action == 'role'" />
  <PermissionNav @go_back="handle_back" v-if="action == 'permission'" />
  <ModuleNav @go_back="handle_back" v-if="action == 'module'" />
  
  <div class="p-6" v-if="action == null">
    <div>
      <h2 class="pl-13 font-bold text-2xl">Users</h2>
    </div>
    <div class="flex gap-5 my-5 pl-13">
      <div  @click="handle_action('user')" class="p-5 border rounded-md w-[20%] shadow-lg flex justify-between" >
        <span>User (10)</span>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up-right"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </div>
      </div>
      <div @click="handle_action('role')" class="p-5 border rounded-md w-[20%] shadow-lg  flex justify-between">
        <span>Role (26)</span>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up-right"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </div>
      </div>
      <div @click="handle_action('permission')" class="p-5 border rounded-md w-[20%] shadow-lg  flex justify-between">
        <span>Permission</span>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up-right"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </div>
      </div>
      <div @click="handle_action('module')" class="p-5 border rounded-md w-[20%] shadow-lg  flex justify-between">
        <span>Module</span>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up-right"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </div>
      </div>
    </div>
    
  </div>
  <User v-if="action == 'user'" />
  <Role v-if="action == 'role'" />
  <Permission v-if="action == 'permission'" />
  <ModuleVue v-if="action == 'module'"/>
</template>

<style scoped></style>
