<script setup>
import { Button, ListView, Tree, FeatherIcon,TextInput } from "frappe-ui";
import { defineEmits, ref ,onMounted} from "vue";
import {create_territory,find_all_territories,find_one_territory,update_territory} from '@/api/userApi.js'
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const emit = defineEmits(["go_back"]);
const open = ref(true);
const territory_name = ref("")
const territory_list = ref([])
const selected_territory = ref(null)
const handle_back = () => {
  emit("go_back");
};

const handle_create = () => {
  selected_territory.value = null
  open.value = !open.value;
};
const handle_create_territory = async()=>{
 const res = await create_territory({territory_name:territory_name.value})
 if(res.statusCode == 200){
    territory_name.value = ""
    open.value = true;
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
      fetch()
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
const fetch = async()=>{
  const res = await find_all_territories()
  if(res.statusCode == 200){
    territory_list.value = res.data
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
const handle_edit = async(id)=>{
  const res = await find_one_territory(id)
  if(res.statusCode == 200){
    console.log(res.data)
    open.value = false
    territory_name.value = res.data.territory_name
    selected_territory.value = res.data.territory_id
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
const handle_update_territory = async()=>{
  const data = {
    territory_id:selected_territory.value,
    territory_name:territory_name.value
  }
  const res = await update_territory(data)
  if(res.statusCode == 200){
    territory_name.value = ""
    open.value = true;
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
      fetch()
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
const handle_change =(e)=>{
  console.log(e.target.value)
}
onMounted(fetch)
</script>

<template>
  <div class="p-8">
    <div class="flex justify-between">
      <div class="">
        <span class="mx-2 text-2xl font-semibold">Territory management</span>
        <Button
          @click="handle_back"
          :variant="'outline'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
        >
          Go Back
        </Button>
      </div>
      <div>
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
            @click="handle_create"
          >
            New
          </Button>
        </div>
      </div>
    </div>

    <div class="ml-24 mt-9" v-if="open">
      <div class="ml-3">
        <u>CRM Territory</u>
      </div>
      <div v-for="data in territory_list" class="my-2 flex">
        <div
          class="rounded-full my-auto mx-3"
          style="width: 10px; height: 10px; background-color: gray"
        ></div>
        <span class="my-auto">{{data.territory_name}}</span>
        <div class="my-auto mx-5">
          <button @click="handle_edit(data.territory_id)" class="mx-2 mt-2">
            <FeatherIcon name="edit" class="h-4 w-6" />
          </button>
          <button>
            <FeatherIcon name="trash" class="h-4 w-6" />
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="w-112 border p-3 mx-auto">
        <div class="flex justify-center relative">
          <span class="text-center text-2xl font-bold" v-if="selected_territory == null">Create Territory</span>
          <span class="text-center text-2xl font-bold" v-else>Update Territory</span>
          
          <button class="absolute start-0 pl-2" @click="open = !open">
            <FeatherIcon name="arrow-left-circle" class="h-6 w-6" />
          </button>
        </div>
        <div class="w-full my-3">
          <div class="p-2 w-100">
            <span >Territory Name</span>
            <br>
            <TextInput
              class="w-full"
              type="text"
              size="sm"
              variant="subtle"
              placeholder="Enter Territory Name"
              :disabled="false"
              v-model="territory_name"
            />
        </div>
        </div>
        <div class="flex justify-center">
          <div class="p-1">
          <Button
           v-if="selected_territory == null"
            :variant="'solid'"
            :ref_for="true"
            theme="gray"
            size="sm"
            label="Button"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
            @click="handle_create_territory"
          >
            Create Territory
          </Button>
          <Button
           v-else
            :variant="'solid'"
            :ref_for="true"
            theme="gray"
            size="sm"
            label="Button"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
            @click="handle_update_territory"
          >
            Update Territory
          </Button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
