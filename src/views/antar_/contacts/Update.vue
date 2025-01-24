<script setup>
import { onMounted, ref } from "vue";
import { Button, Dialog, Autocomplete, TextInput, Switch } from "frappe-ui";
import CreateAddress from "@/components/modal/CreateAddress.vue";
import Nav from "@/views/antar_/contacts/nav/Nav.vue";
import {
  find_all_industry,
  find_all_territories,
  findAllUsers,
  get_all_address_contact,
  update_contact,
  get_contact_by_id,
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
const address_list = ref([]);

const form_details = ref({
  contact_id: null,
  salutation: null,
  first_name: null,
  last_name: null,
  email: null,
  mobile: null,
  gender: null,
  designation: null,
  company_name: null,
  address: null,
});

const fetch = async () => {
  const [industry_res, territory_res, users_res, address_res] =
    await Promise.all([
      find_all_industry(),
      find_all_territories(),
      findAllUsers(),
      get_all_address_contact(),
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
  if (address_res.statusCode == 200) {
    address_list.value = address_res.data.map((val, i) => ({
      label: val.address_title,
      value: val.address_contact_id,
    }));
  } else {
    show_error(address_res);
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

const handle_save_contact = async () => {
  const res = await update_contact(form_details.value);
  if (res.statusCode == 200) {
    router.push(`/antar_/contacts/${form_details.value.contact_id}`);
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
// onMounted(fetch);
const fetchContactById = async (contactId) => {
  const res = await get_contact_by_id(contactId);
  if (res.statusCode == 200) {
    form_details.value.contact_id = res.data.contact_id;
    form_details.value.salutation = res.data.salutation;
    form_details.value.first_name = res.data.first_name;
    form_details.value.last_name = res.data.last_name;
    form_details.value.email = res.data.email_id;
    form_details.value.mobile = res.data.phone;
    form_details.value.gender = res.data.gender;
    form_details.value.designation = res.data.designation;
    form_details.value.company_name = res.data.company_name;

    // Push the current address to address list
    if (res.data.address_contact) {
      const currentAddress = {
        label: res.data.address_contact.address_title,
        value: res.data.address_contact.address_id,
      };
      console.log(currentAddress, '00--1');
      console.log(address_list.value, '00--2');
      // Check if the address is already in the list to avoid duplicates
      if (!address_list.value.some(address => address.value === currentAddress.value)) {
        address_list.value.push(currentAddress);
      }
      form_details.value.address = currentAddress;
      console.log(currentAddress, '00');
   
    } else {
      console.error('Address data not found');
    }
  } else {
    show_error(res);
  }
};

onMounted(async () => {
  const contactId = router.currentRoute.value.hash.split("#")[1];

  await fetch();
  await fetchContactById(contactId);
});
</script>

<template>
  <Nav @update="handle_save_contact" />

  <div class="mx-4">
    <hr />
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
    <div class="flex justify-between">
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
    <div class="flex justify-between">
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

    <div class="">
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">company name</span>
        <TextInput
          class="text-gray-500 font-medium text-sm my-1"
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="enter organization"
          :disabled="false"
          :modelValue="form_details.company_name"
          v-model="form_details.company_name"
        />
      </div>
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">Designation</span>
        <TextInput
          :type="'text'"
          :ref_for="true"
          size="sm"
          variant="subtle"
          placeholder="enter designation"
          :disabled="false"
          :modelValue="form_details.designation"
          v-model="form_details.designation"
        />
      </div>
      <div class="">
        <span class="text-gray-500 font-medium text-sm my-1">Address</span>
        <div class="p-2 w-full flex justify-center">
          <div class="w-[87%]">
            <Autocomplete
              :options="address_list"
              v-model="form_details.address"
              :modelValue="form_details.address"
              placeholder="Select address"
              :hideSearch="true"
              class="w-[90%]"
            />
          </div>
          <div class="w-[20%] mx-3">
            <CreateAddress :type="'contact'" @get_all_address="fetch" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
