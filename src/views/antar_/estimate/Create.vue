<script setup>
import { useRouter } from "vue-router";
import Nav from "./nav/Nav.vue";
import { get_existing_org_estimate } from "@/api/userApi";
import { onMounted, ref } from "vue";
import {
  Button,
  Dialog,
  Autocomplete,
  TextInput,
  Dropdown,
  Textarea,
  ListView,
} from "frappe-ui";
const router = useRouter();
const product_id = router.currentRoute.value.hash.split("#")[1];
const estimate_details = ref(null);
const dialog2 = ref(false);
const product_list = ref([
  {
    id: "1232",
    product_name: "product ",
    tax_total: "dfas",
    grand_total: "dfasd",
    quantity: "ddddd",
  },
  {
    id: "1232232323",
    product_name: "product ",
    tax_total: "dfas",
    grand_total: "dfasd",
    quantity: "ddddd",
  },
]);
const fetch = async () => {
  if (product_id) {
    const res = await get_existing_org_estimate(product_id);
    if (res.statusCode == 200) {
      estimate_details.value = res.data;
    }
  }
};
const form_details = ref({
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
const row_details = ref(null);
const handle_click_d = (data) => {
  dialog2.value = true;
  row_details.value = data;
};

onMounted(fetch);
</script>

<template>
  <Nav></Nav>
  <div class="p-4">
    <div class="mx-4">
      <hr />
      <div class="p-2 w-full">
        <span class="text-gray-500 font-medium text-sm my-1">organization</span>
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
          <span class="text-gray-500 font-medium text-sm my-1"
            >Estimate number</span
          >
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
          <span class="text-gray-500 font-medium text-sm my-1">Issue Date</span>
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
        <div class="p-2 w-full">
          <span class="text-gray-500 font-medium text-sm my-1"
            >Discount total</span
          >
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

      <div class="p-1">
        <Textarea
          :variant="'subtle'"
          :ref_for="true"
          size="sm"
          placeholder="Placeholder"
          :disabled="false"
          modelValue=""
          label="Notes"
        />
      </div>

      <ListView
        class="h-[250px] my-4 border rounded-md"
        :columns="[
          {
            label: 'ID',
            key: 'id',
            icon: 'user',
            width: '100px',
          },
          { label: 'Product Name', key: 'product_name', width: '180px' },
          { label: 'Product Unit Price', key: 'tax_total', width: '150px' },
          {
            label: 'Product Tax Rate Per Unit',
            key: 'grand_total',
            width: '180px',
          },
          { label: 'product Quantity', key: 'quantity', width: '180px' },
          { label: 'Product Action', key: 'action', width: '180px' },
        ]"
        :rows="product_list"
        :options="{
          selectable: true,
          showTooltip: true,
          resizeColumn: true,
          emptyState: {
            title: 'No records found',
            description: 'Create a new record to get started',
            button: {
              label: 'New Record',
              variant: 'solid',
            },
          },
        }"
        row-key="id"
      >
        <template #cell="{ item, row, column }">
          <span class="font-medium text-ink-gray-7">
            {{ item }}

            <div class="p-1" v-if="column.key == 'action'">
              <Button @click="handle_click_d(row.id)"> Product Action </Button>
              <Dialog v-model="dialog2">
                <template #body-title>
                  <h3>Product Actions</h3>
                </template>
                <template #body-content>
                  <div class="p-2">
                    <span>enter product quantity</span>
                    <TextInput
                      :type="'number'"
                      :ref_for="true"
                      size="sm"
                      variant="subtle"
                      placeholder="Placeholder"
                      :disabled="false"
                      modelValue=""
                    />
                  </div>
                  <div class="p-2">
                    <span>enter product quantity</span>
                    <TextInput
                      :type="'number'"
                      :ref_for="true"
                      size="sm"
                      variant="subtle"
                      placeholder="Placeholder"
                      :disabled="false"
                      modelValue=""
                    />
                  </div>
                  <div class="p-2">
                    <span>enter product quantity</span>
                    <TextInput
                      :type="'number'"
                      :ref_for="true"
                      size="sm"
                      variant="subtle"
                      placeholder="Placeholder"
                      :disabled="false"
                      modelValue=""
                    />
                  </div>
                  <div class="p-2">
                    <span>enter product quantity</span>
                    <TextInput
                      :type="'number'"
                      :ref_for="true"
                      size="sm"
                      variant="subtle"
                      placeholder="Placeholder"
                      :disabled="false"
                      modelValue=""
                    />
                  </div>
                </template>
                <template #actions>
                  <Button
                   
                    :variant="'subtle'"
                    :ref_for="true"
                    theme="red"
                    size="sm"
                    label="Button"
                    :loading="false"
                    :loadingText="null"
                    :disabled="false"
                    :link="null"
                  >
                    Delete Row
                  </Button>
                  <Button class="ml-2" variant="solid"> Update Row </Button>
                  <Button class="ml-2" @click="dialog2 = false"> Close </Button>
                </template>
              </Dialog>
            </div>
          </span>
        </template>
      </ListView>
      <div class="flex justify-between">
        <Dropdown
      :options="[
        {
          label: 'Edit Title',
          onClick: () => {
                      },
      
        },
        {
          label: 'Manage Members',
          onClick: () => {
                      },
       
        },
        {
          label: 'Delete this project',
          onClick: () => {
                      },
   
        },
      ]"
        :button="{
    label: 'Add Proudct',
  }"
    />
    <span class="font-semibold  text-gray-600 my-auto">Grand total: <span class="font-bold text-black">12345</span> </span>
      </div>
      
    </div>
  </div>
</template>

<style scoped></style>
