<script setup>
import { ref } from "vue";
import { get_lead_activity } from '@/api/userApi.js'
import { Button, FeatherIcon } from "frappe-ui";
import { useSwitchStore } from '@/stores/switch';
const switchStore = useSwitchStore();
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const array_list = ref([]);
const fetch = async () => {
  const res = await get_lead_activity(switchStore.create_form);
  if(res.statusCode==200){
    array_list.value = res.data;
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
};
fetch()
</script>

<template>
  <div class="p-3 flex justify-between">
    <span class=" text-2xl font-medium"> Activity </span>
    <div class="p-1">
      <Button
        style="width: 100px"
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
      >
        <div class="flex justify-start">
          <FeatherIcon class="w-4" name="plus" /> <span>New</span>
        </div>
      </Button>
    </div>
  </div>
  <div>
       <div v-for="(item,index) in array_list" class="p-3 border my-3">
           <span class="text-sm font-medium"> {{index+1}} .</span>
           <br>
           <span class="text-sm font-medium"> {{item.module_name}}- </span>
          
           <span class="text-sm font-medium"> {{item.action}} : </span>
           <br>
           <span class="text-sm font-medium text-center"> {{item.change}} </span>
       </div>
  </div>
</template>

<style scoped></style>
