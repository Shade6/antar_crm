


<script setup>
import Nav from "./nav/Nav.vue";
import { onMounted, ref } from "vue";
import { Button, Dialog, Autocomplete, TextInput } from "frappe-ui";

import {
  find_all_industry,
  find_all_territories,
  findAllUsers,
  create_lead,
  get_all_product,
  find_single_lead,
  convert_lead

} from "@/api/userApi.js";
import { useRouter } from "vue-router";
const router = useRouter();
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const industry_list = ref([]);
const territory_list = ref([]);
const user_list = ref([]);
const product_list = ref([]);
const lead_data = ref({})

const form_details = ref({
  lead_id:router.currentRoute.value.hash,
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
  opportunity_name: null,
  opportunity_value: null,
  product:null
});

const fetch = async () => {
  const [industry_res, territory_res, users_res,product_res,lead_ref] = await Promise.all([
    find_all_industry(),
    find_all_territories(),
    findAllUsers(),
    get_all_product(),
    find_single_lead(router.currentRoute.value.hash.slice(1))
  ]);
  if (lead_ref.statusCode == 200) {
    lead_data.value = lead_ref.data
    
    form_details.value.lead_id=lead_ref.data.lead_id
    form_details.value.salutation= lead_ref.data.salutation
    form_details.value.first_name=lead_ref.data.first_name
    form_details.value.last_name= lead_ref.data.last_name
    form_details.value.email= lead_ref.data.email
    form_details.value.mobile=lead_ref.data.contact
    form_details.value.gender=lead_ref.data.gender
    form_details.value.organization= lead_ref.data.company
    form_details.value.website= lead_ref.data.website
    form_details.value. employees= lead_ref.data.employees
    form_details.value.territory_id=lead_ref.data.territory_id
    form_details.value.revenue= lead_ref.data.revenue
    form_details.value.industry_id= lead_ref.data.industry_id
    form_details.value.status= lead_ref.data.status
    form_details.value.owner_id= lead_ref.data.assigned_to


  } else {
    show_error(lead_ref);
  }
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
  if (product_res.statusCode == 200) {
    product_list.value = product_res.data.map((val, i) => ({
      label: val.product_name ,
      value: val.product_id,
    }));
  } else {
    show_error(product_res);
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


const handle_convert_lead = async()=>{
   const res = await convert_lead(form_details.value)
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
}
</script>
<template>
  <Nav @convert="handle_convert_lead" />
  
  <div class="mx-4">
    <div class="p-2">
        <span class="text-xs text-gray-600">Lead created on</span>
        <br>
        <span class="px-2 py-1 ">{{ new Date(lead_data.created_at).toLocaleDateString() }}</span>
    </div>
    
    <div class="flex justify-between">
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Salutation</span>
        <Autocomplete
          class="w-[90%]"
          :options="[
            {
              label: 'Master',
              value: 'Master',
            },
            {
              label: 'Miss',
              value: 'Miss',
            },
            {
              label: 'Mr',
              value: 'Mr',
            },
            {
              label: 'Mrs',
              value: 'Mrs',
            },
            {
              label: 'Ms',
              value: 'Ms',
            },
          ]"
          v-model="form_details.salutation"
          placeholder="Select salutation"
        />
      </div>
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">First Name</span>
        <TextInput
          class="text-gray-500 font-medium text-sm my-1"
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="enter first name"
          :disabled="false"
          :modelValue="form_details.first_name"
          v-model="form_details.first_name"
        />
      </div>
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Last Name</span>
        <TextInput
          class="text-gray-500 font-medium text-sm my-1"
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="enter last name"
          :disabled="false"
          :modelValue="form_details.last_name"
          v-model="form_details.last_name"
        />
      </div>
    </div>

    <div class="flex justify-between">
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Email</span>
        <TextInput
          class="text-gray-500 font-medium text-sm my-1"
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="enter email address"
          :disabled="false"
          :modelValue="form_details.email"
          v-model="form_details.email"
        />
      </div>
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Mobile No</span>
        <TextInput
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="enter mobile number"
          :disabled="false"
          :modelValue="form_details.mobile"
          v-model="form_details.mobile"
        />
      </div>
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Gender</span>
        <Autocomplete
          :options="[
            {
              label: 'Female',
              value: 'Female',
            },
            {
              label: 'Male',
              value: 'Male',
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

    <hr class="my-3" />

    <div class="flex justify-between">
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Organization</span>
        <TextInput
          class="text-gray-500 font-medium text-sm my-1"
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="enter organization"
          :disabled="false"
          :modelValue="form_details.organization"
           v-model="form_details.organization"
          />
      </div>
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Website</span>
        <TextInput
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
        <span class="text-gray-500 font-medium text-sm my-1"
          >No. of Employees
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






    <div class="flex justify-between">
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Territory</span>
        <Autocomplete
          :options="territory_list"
          v-model="form_details.territory_id"
          placeholder="Select territory"
        />
      </div>
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1"
          >Annual Revenue
        </span>
        <TextInput
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="select annual revenue"
          :disabled="false"
          :modelValue="form_details.revenue"
          v-model="form_details.revenue"
        />
      </div>
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Industry</span>
        <Autocomplete
          :options="industry_list"
          v-model="form_details.industry_id"
          placeholder="Select industry"
        />
      </div>
    </div>
    <hr class="my-3" />
    <div class="flex justify-between">
      <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1"
            >opportunity name
          </span>
          <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter opportunity name"
            :disabled="false"
            :modelValue="form_details.opportunity_name"
            v-model="form_details.opportunity_name"
          />
        </div>

        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1"
            >opportunity value
          </span>
          <TextInput
            :type="'number'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter opportunity value"
            :disabled="false"
            :modelValue="form_details.opportunity_value"
            v-model="form_details.opportunity_value"
          />
        </div>
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1">Product/Service</span>
          <Autocomplete
            :options="product_list"
              v-model="form_details.product"
              placeholder="Select product/service"
            :multiple="true"
          />
        </div>
      </div>
    <div class="flex justify-between">
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Status </span>
        <Autocomplete
          :options="[
            {
              label: 'New',
              value: 'New',
            },
            {
              label: 'Contacted',
              value: 'Contacted',
            },
            {
              label: 'Nurture',
              value: 'Nurture',
            },
            {
              label: 'Qualified',
              value: 'Qualified',
            },
            {
              label: 'UnQualified',
              value: 'UnQualified',
            },
            {
              label: 'Junk',
              value: 'Junk',
            },
          ]"
          v-model="form_details.status"
          placeholder="Select status"
        />
      </div>
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Lead Owner </span>
        <Autocomplete
          :options="user_list"
          v-model="form_details.owner_id"
          placeholder="Select owner"
        />
      </div>
    </div>
  
  </div>
</template>

<style scoped>

</style>
