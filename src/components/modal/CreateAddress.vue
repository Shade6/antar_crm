<template>
  <div>
    <div class="">
      <Button
        class="bg-dark"
        @click="dialog2 = true"
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        size="sm"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
      >
        <span class="text-bold">+</span>
        Create address
      </Button>
    </div>

    <Dialog v-model="dialog2">
      <template #body-title>
        <h1 class="font-semibold text-2xl">Create Address</h1>
      </template>
      <template #body-content>
        <div class="flex justify-between my-2">
          <div class="w-[48%]">
            <span class="text-gray-500 font-medium text-sm my-1"
              >Address Title</span
            >
            <TextInput
              placeholder="Enter address title"
              v-model="form_values.address_title"
              :modelValue="form_values.address_title"
            />
          </div>
          <div class="w-[48%]">
            <span class="text-gray-500 font-medium text-sm my-1"
              >Address Type</span
            >
         
            <Autocomplete
              :options="[
                {
                  label: 'Billing',
                  value: 'billing',
                },
                {
                  label: 'Shipping',
                  value: 'shipping',
                },
                {
                  label: 'Office',
                  value: 'office',
                },
                {
                  label: 'Personal',
                  value: 'personal',
                },
                {
                  label: 'Plant',
                  value: 'plant',
                },
                {
                  label: 'Postal',
                  value: 'postal',
                },
                {
                  label: 'Shop',
                  value: 'shop',
                },
                {
                  label: 'Subsidiary',
                  value: 'subsidiary',
                },
                {
                  label: 'Warehouse',
                  value: 'warehouse',
                },
                {
                  label: 'Work',
                  value: 'work',
                },
                {
                  label: 'Current',
                  value: 'current',
                },
                {
                  label: 'Permanent',
                  value: 'permanent',
                },
                {
                  label: 'Other',
                  value: 'other',
                },
              ]"
               v-model="form_values.address_type"
              :modelValue="form_values.address_type"
              placeholder="Select address type"
            />
          
          </div>
          
        </div>
        <div class="flex justify-between my-2">
          <div class="w-[48%]">
            <span class="text-gray-500 font-medium text-sm my-1"
              >Address line one</span
            >
            <TextInput
              placeholder="address line one"
              v-model="form_values.address_line_one"
              :modelValue="form_values.address_line_one"
            />
          </div>
          <div class="w-[48%]">
            <span class="text-gray-500 font-medium text-sm my-1"
              >Address line two</span
            >
            <TextInput
              placeholder="Address line two"
              v-model="form_values.address_line_two"
              :modelValue="form_values.address_line_two"
            />
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="w-[48%]">
            <span class="text-gray-500 font-medium text-sm my-1"
              >city/town</span
            >
            <TextInput
              placeholder="city/town"
              v-model="form_values.city_town"
              :modelValue="form_values.city_town"
            />
          </div>
          <div class="w-[48%]">
            <span class="text-gray-500 font-medium text-sm my-1"
              >State/Province</span
            >
            <TextInput
              placeholder="State/Province"
              v-model="form_values.state_province"
              :modelValue="form_values.state_province"
            />
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="w-[48%]">
            <span class="text-gray-500 font-medium text-sm my-1">Country</span>
            <TextInput
              placeholder="Country"
              v-model="form_values.country"
              :modelValue="form_values.country"
            />
          </div>
          <div class="w-[48%]">
            <span class="text-gray-500 font-medium text-sm my-1"
              >Postal Code</span
            >
            <TextInput
              placeholder="Postal Code"
              v-model="form_values.postal_code"
              :modelValue="form_values.postal_code"
            />
          </div>
        </div>
      </template>
      <template class="flex justify-end" #actions>
        <div class="flex justify-end">
          <Button class="" variant="solid" @click="createAddress_save">
            create
          </Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { h, ref, watch, defineEmits, defineProps } from "vue";
import { Button, Dialog, Autocomplete, TextInput } from "frappe-ui";
import { create_address_org,create_address_contact } from "@/api/userApi.js";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";

const emit = defineEmits(["get_all_address"]);
const toast = useToast();
const dialog2 = ref(false);
const single = ref("");

const props = defineProps({
  type: {
    type: String,
    required: true
  }
});

const form_values = ref({
  address_title: null,
  address_type: null,
  address_line_one: null,
  address_line_two: null,
  city_town: null,
  state_province: null,
  country: null,
  postal_code: null,
});

const createAddress_save = async () => {
  let res;
  if (props.type === "organization") {
    res = await create_address_org(form_values.value);
  } else {
    res = await create_address_contact(form_values.value);
  }
  
  if (res && res.statusCode === 200) {
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
    dialog2.value = false;
    emit("get_all_address");
  } else {
    toast.error(res.message || "An error occurred", {
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
</script>

<style scoped>
.create-lead-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.custom-dialog {
  width: 43rem;
  max-width: 90%; /* Optional: Responsive design */
}
</style>
