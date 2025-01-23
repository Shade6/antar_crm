<script setup>
import { onMounted, ref } from "vue";
import { Button, Dialog, Autocomplete, TextInput, Switch } from "frappe-ui";
import Nav from "@/views/antar_/opportunity/nav/Nav.vue";
import {
  find_all_industry,
  find_all_territories,
  findAllUsers,
  create_deal,
  get_all_organization,
  get_all_contact,
} from "@/api/userApi.js";

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

const organization_list = ref([]);
const contact_list = ref([]);
const fetch = async () => {
  const [
    industry_res,
    territory_res,
    users_res,
    organization_res,
    contact_res,
  ] = await Promise.all([
    find_all_industry(),
    find_all_territories(),
    findAllUsers(),
    get_all_organization(),
    get_all_contact(),
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
  if (organization_res.statusCode == 200) {
    organization_list.value = organization_res.data.map((val, i) => ({
      label: val?.organization_name || "N/A",
      value: val?.organization_id || "N/A",
    }));
  }
  if (contact_res.statusCode == 200) {
    contact_list.value = contact_res.data.map((val, i) => ({
      label: val.first_name,
      value: val.contact_id,
    }));
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

const handle_save_deal = async () => {
  const details = {
    ...form_details.value,
    organization_id: checked.value.organization
      ? checked.value.organization
      : null,
    contact_id: checked.value.contact ? checked.value.contact : null,
  };
  const res = await create_deal(details);
  if (res.statusCode == 200) {
    router.push("/antar_/opportunities");
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
  <Nav @save="handle_save_deal" />
  <div class="p-4 mx-auto">
    <div class="flex my-4">
      <Switch
        size="sm"
        label="Choose Existing Organization"
        description=""
        :disabled="false"
        v-model="checked.organization"
      />
      <Switch
        size="sm"
        label="Choose Existing Contact"
        description=""
        :disabled="false"
        v-model="checked.contact"
      />
    </div>

    <hr />
    <div v-if="checked.contact == false">
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
    </div>
    <div v-else>
      <div>
        <span>Contact</span>
        <div class="p-2 w-1/3">
          <Autocomplete
            :options="contact_list"
            v-model="checked.contact"
            placeholder="Select contact"
          />
        </div>
      </div>
    </div>
    <hr class="my-3" />
    <div v-if="checked.organization == false">
      <div class="flex justify-between">
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1"
            >Organization</span
          >
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
    </div>
    <div v-else>
      <div>
        <span>Organization</span>
        <div class="p-2 w-1/3">
          <Autocomplete
            :options="organization_list"
            v-model="checked.organization"
            placeholder="Select organization"
          />
        </div>
      </div>
    </div>
    <hr class="my-3" />
    <div>
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
          <span class="text-gray-500 font-medium text-sm my-1"
            >Opportunity Owner
          </span>
          <Autocomplete
            :options="user_list"
            v-model="form_details.owner_id"
            placeholder="Select owner"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
