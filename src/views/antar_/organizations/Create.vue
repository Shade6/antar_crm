<script setup>
import { onMounted, ref } from "vue";
import { Button, Dialog, Autocomplete, TextInput, Switch } from "frappe-ui";
import CreateAddress from "@/components/modal/CreateAddress.vue";
import Nav from "@/views/antar_/organizations/nav/Nav.vue";
import {
    find_all_industry,
    find_all_territories,
    findAllUsers,
    get_all_address,
    create_organization
} from "@/api/userApi.js";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
const router = useRouter();
const toast = useToast();
const industry_list = ref([]);
const territory_list = ref([]);
const user_list = ref([]);
const address_list = ref([]);
const checked = ref({
  organization: false,
  contact: false,
});
const form_details = ref({
  organization_name: null,
  website: null,
  annual_revenue: null,
  no_of_employee: null,
  industry: null,
  territory: null,
  address: null,
});

const fetch = async () => {
  const [industry_res, territory_res, users_res,address_res] = await Promise.all([
    find_all_industry(),
    find_all_territories(),
    findAllUsers(),
    get_all_address()
  ]);
  if (industry_res.statusCode == 200) {
    industry_list.value = industry_res.data.map((val, i) => ({
      label: val.industry_name,
      value: val.industry_id,
    }));
  } else {
    show_error(industry_res);
  }
  if (territory_res.statusCode == 200) {
    territory_list.value = territory_res.data.map((val, i) => ({
      label: val.territory_name,
      value: val.territory_id,
    }));
  } else {
    show_error(territory_res);
  }
  if (users_res.statusCode == 200) {
    user_list.value = users_res.data.map((val, i) => ({
      label: val.first_name + " " + val.last_name,
      value: val.user_id,
    }));
  } else {
    show_error(users_res);
  }
  if(address_res.statusCode == 200){
    address_list.value = address_res.data.map((val, i) => ({
      label: val.address_title,
      value: val.address_id,
    }));
  }else{
    show_error(address_res)
  }
};
const show_error = (res) => {
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
};

const handle_save_organization = async () => {
  const res = await create_organization(form_details.value);
  if (res.statusCode == 200) {
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
onMounted(fetch);
</script>

<template>
  <Nav @save="handle_save_organization" />
  <div class=" mx-4">

 

    <hr />
    <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Organization Name</span>
          <TextInput
            class="text-gray-500 font-medium text-sm my-1"
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter organization name"
            :disabled="false"
            :modelValue="form_details.organization_name"
            v-model="form_details.organization_name"
          />
        </div>
      <div class="flex justify-between">
      
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Website</span>
          <TextInput
            class="text-gray-500 font-medium text-sm my-1"
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter website"
            :disabled="false"
            :modelValue="form_details.website"
            v-model="form_details.website"
          />
        </div>
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Annual Revenue</span>
          <TextInput
            class="text-gray-500 font-medium text-sm my-1"
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter annual revenue"
            :disabled="false"
            :modelValue="form_details.annual_revenue"
            v-model="form_details.annual_revenue"
          />
        </div>
      </div>
      <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Territory</span>
          <Autocomplete
            :options="territory_list"
            v-model="form_details.territory"
            placeholder="Select territory"
          />
        </div>
      <div class="flex justify-between">
      
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">No of employee</span>
          <Autocomplete
            :options="[
              {
                label: '1-10',
                value: '1-10',
              },
              {
                label: '11-50',
                value: '11-50',
              },
              {
                label: '50-100',
                value: '50-100',
              },
              {
                label: '100+',
                value: '100+',
              },
            ]"
            v-model="form_details.no_of_employee"
            placeholder="Select no of employee"
          />
        </div>
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Industry</span>
          <Autocomplete
            :options="industry_list"
            v-model="form_details.industry"
            placeholder="Select industry"
          />
        </div>
      </div>
  

      
   
    

      <div class="">
        <span class="text-gray-500 font-medium text-sm my-1">Address</span>
        <div class="p-2 w-full flex justify-center">
          <div class="w-[87%]">
          <Autocomplete
            :options="address_list"
            v-model="form_details.address"
            placeholder="Select address"
            :hideSearch="true"
           class="w-[85%]"
          />
     

          </div>
          <div class=" w-[20%] mx-3"> 
            <CreateAddress @get_all_address="fetch"/>
          </div>
        </div>
      </div>
      
  </div>

</template>

<style scoped></style>
