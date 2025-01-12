<script setup>
import { defineProps, watch, ref, defineEmits, onMounted } from "vue";
import { findUserById } from "@/api/userApi.js";
import { Button, Tabs } from "frappe-ui";
import UserDetails from "./userTabs/UserDetails.vue";
import RolePermission from "./userTabs/RolePermission.vue";
import MoreInfo from "./userTabs/MoreInfo.vue";
import Settings from "./userTabs/Settings.vue";
import Connections from "./userTabs/Connections.vue";
import {create_email_user_email} from '@/api/userApi.js'
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const state = ref("details");
const emit = defineEmits(["back"]);
const user_details = ref({});
const email_details = ref({})
const fetch_user_details = async () => {
  const res = await findUserById(props.id);
  if (res.statusCode == 200) {
    user_details.value = res.data;
  } else {
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
      style: {
        background: "#FFF5F5",
        color: "black",
        padding: "4px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderLeft: "5px solid red",
      },
    });
  }
};
const email_details_func=(data)=>{
    email_details.value = data
}


const handle_save = async()=>{
   const res  = await create_email_user_email(email_details.value)
   if(res.statusCode == 200){
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
      style: {
        background: "white",
        color: "black",
        padding: "4px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderLeft: "5px solid green",
      },
    });
   }else{
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
      style: {
        background: "#FFF5F5",
        color: "black",
        padding: "4px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderLeft: "5px solid red",
      },
    });
   }
}
watch(
  () => props.id,
  () => {
    fetch_user_details();
  }
);
onMounted(fetch_user_details);
</script>

<template>
  <div class="flex justify-between">
    <div class="my-2 p-2">
      <span class="mx-3">{{
        user_details
          ? user_details.first_name + " " + user_details.last_name
          : "user not found"
      }}</span>
      <Button @click="emit('back')">back</Button>
    </div>
    <div class="flex items-center" > 
      <div class="p-1">
        <Button
          :variant="'subtle'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
        >
          Permission
        </Button>
      </div>
      <div class="p-1">
        <Button
          :variant="'subtle'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
        >
          Password
        </Button>
      </div>
      <div class="p-1">
        <Button
          :variant="'solid'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
          @click="handle_save"
        >
          Save
        </Button>
      </div>
    </div>
  </div>
  <Tabs
    v-model="state"
    :tabs="[
      { label: 'User Details', value: 'details' },
      { label: 'Roles & Permissions', value: 'roles' },
      { label: 'More Information', value: 'info' },
      { label: 'Settings', value: 'settings' },
      { label: 'Connections', value: 'connections' },
    ]"
    class="border rounded"
  >
    <div class="p-3">
      <UserDetails :details="user_details" v-if="state == 0" />
      <RolePermission v-if="state == 1" />
      <MoreInfo v-if="state == 2" />
      <Settings @email_details="email_details_func" :details="user_details" v-if="state == 3" />
      <Connections v-if="state == 4" />
    </div>
  </Tabs>
</template>

<style scoped></style>
