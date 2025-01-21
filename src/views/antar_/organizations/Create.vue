<script setup>
import { onMounted, ref } from "vue";
import { Button, Dialog, Autocomplete, TextInput, Switch } from "frappe-ui";
import Nav from "@/views/antar_/organizations/nav/Nav.vue";
// import {
//     find_all_industry,
//     find_all_territories,
//     findAllUsers,
// } from "@/api/userApi.js";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
const router = useRouter();
const toast = useToast();
const industry_list = ref([]);
const territory_list = ref([]);
const user_list = ref([]);
const checked = ref({
  organization: false,
  contact: false,
});
const form_details = ref({
  salutation: null,
  first_name: null,
  last_name: null,
  email: null,
  mobile: null,
  gender: null,
  organization: null,
  website: null,
  employees: null,
  territory_id: null,
  revenue: null,
  industry_id: null,
  status: null,
  owner_id: null,
});

const fetch = async () => {
  const [industry_res, territory_res, users_res] = await Promise.all([
    find_all_industry(),
    find_all_territories(),
    findAllUsers(),
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

const handle_save_lead = async () => {
  const res = await create_lead(form_details.value);
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
  <Nav />
  <div class="w-1/2 mx-24">
    <div class="my-3 flex justify-center relative">
      <span class="text-3xl font-semibold">Create Contact</span>
      <div class="p-1 absolute start-0">
        <Button
          @click="router.push('/antar_/contacts/')"
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
          Close
        </Button>
      </div>
    </div>
    <hr />
 

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
            :modelValue="form_details.first_name"
            v-model="form_details.first_name"
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
            :modelValue="form_details.first_name"
            v-model="form_details.first_name"
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
            :modelValue="form_details.last_name"
            v-model="form_details.last_name"
          />
        </div>
      </div>
      <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Territory</span>
          <Autocomplete
            :options="[
              {
                label: 'Asia',
                value: 'Asia',
              },
              {
                label: 'Europe',
                value: 'Europe',
              },
              {
                label: 'Other',
                value: 'Other',
              },
            ]"
            v-model="form_details.gender"
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
                label: 'Other',
                value: 'Other',
              },
            ]"
            v-model="form_details.gender"
            placeholder="Select gender"
          />
        </div>
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Industry</span>
          <Autocomplete
            :options="[
              {
                label: 'Automotive',
                value: 'Automotive',
              },
              {
                label: 'Healthcare',
                value: 'Healthcare',
              },
              {
                label: 'Other',
                value: 'Other',
              },
            ]"
            v-model="form_details.gender"
            placeholder="Select gender"
          />
        </div>
      </div>
  

      
   
    

      <div class="">
        
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1"
            >Address
          </span>

          <Autocomplete
            :options="[
              {
                label: '1-10',
                value: '1-10',
              },
              {
                label: '11-50',
                value: 'jane-doe',
              },
              {
                label: '51-200',
                value: '51-200',
              },
              {
                label: '201-500',
                value: '201-500',
              },
              {
                label: '501-1000',
                value: '501-1000',
              },
              {
                label: '1000+',
                value: '1000+',
              },
            ]"
            v-model="form_details.employees"
            placeholder="Select employee"
            :hideSearch="true"
          />
        </div>
      </div>
  </div>
</template>

<style scoped></style>
