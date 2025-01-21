<script setup>
import Nav from "./nav/Nav.vue";
import { ref } from "vue";
import { FeatherIcon, Button, Tabs,ListView } from "frappe-ui";

const state = ref({
  index: 0, // Initialize index to 0 for the first tab
  deals: [], // Initialize deals as an empty array
  contacts: [], // Initialize contacts as an empty array
});

// Example data for testing (optional)
state.value.deals = [
  { id: 1, name: "Deal 1", amount: "$500", status: "Closed" },
  { id: 2, name: "Deal 2", amount: "$1000", status: "Pending" },
];
state.value.contacts = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];
const tab = ref(0)
</script>

<template>
  <Nav></Nav>
  <div class="m-3">
    <div class="flex">
      <div
        class="p-16 w-24 h-24 rounded-full bg-gray-200 flex justify-center items-center"
      >
        Y
      </div>
      <div>
        <div class="mt-8 mx-4">
          <span class="text-gray-500 font-medium text-3xl my-1">
            YRSK Marketing & Branding Solutions Pvt Ltd
          </span>
          <br />
        </div>
        <div class="flex">
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
              <div class="flex gap-2">
                <FeatherIcon icon="pencil" class="w-4 h-4" />
                Edit
              </div>
            </Button>
          </div>
          <div class="p-1">
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
              <div class="flex gap-2">
                <FeatherIcon icon="trash" class="w-4 h-4" />
                Delete
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="p-4">
    <div class="border-b border-gray-200 dark:border-neutral-700">
      <nav
        class="flex gap-x-1"
        aria-label="Tabs"
        role="tablist"
        aria-orientation="horizontal"
      >
        <button
          type="button"
          class="hs-tab-active:font-semibold hs-tab-active:border-black hs-tab-active:text-black py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-black focus:outline-none focus:text-black disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 active"
          id="tabs-with-icons-item-1"
          aria-selected="true"
          data-hs-tab="#tabs-with-icons-1"
          aria-controls="tabs-with-icons-1"
          role="tab"
@click="tab =0"
        >
          <svg
            class="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Deals
        </button>
        <button
          type="button"
          class="hs-tab-active:font-semibold hs-tab-active:border-black hs-tab-active:text-black py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-black focus:outline-none focus:text-black disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
          id="tabs-with-icons-item-2"
          aria-selected="false"
          data-hs-tab="#tabs-with-icons-2"
          aria-controls="tabs-with-icons-2"
          role="tab"
          @click="tab =1"
        >
          <svg
            class="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
          </svg>
          Contacts
        </button>
      </nav>
    </div>

    <div class="mt-3">
      <div
        id="tabs-with-icons-1"
        role="tabpanel"
        aria-labelledby="tabs-with-icons-item-1"
        v-if="tab == 0"
      >
        <div>
          <ListView
            class="h-[250px]"
            :columns="[
              {
                label: 'Name',
                key: 'name',
                width: 3,
                getLabel: ({ row }) => row.name,
                prefix: ({ row }) => {
                  return h(Avatar, {
                    shape: 'circle',
                    image: row.user_image,
                    size: 'sm',
                  });
                },
              },
              {
                label: 'Email',
                key: 'email',
                width: '200px',
              },
              {
                label: 'Role',
                key: 'role',
              },
              {
                label: 'Status',
                key: 'status',
              },
            ]"
            :rows="[
              {
                id: 1,
                name: 'John Doe',
                email: 'john@doe.com',
                status: 'Active',
                role: 'Developer',
                user_image: 'https://avatars.githubusercontent.com/u/499550',
              },
              {
                id: 2,
                name: 'Jane Doe',
                email: 'jane@doe.com',
                status: 'Inactive',
                role: 'HR',
                user_image: 'https://avatars.githubusercontent.com/u/499120',
              },
            ]"
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
              </span>
            </template>
          </ListView>
        </div>
      </div>
      <div
        id="tabs-with-icons-2"
        class="hidden"
        role="tabpanel"
        aria-labelledby="tabs-with-icons-item-2"
        v-if="tab == 1"
      >
      <div>
          <ListView
            class="h-[250px]"
            :columns="[
              {
                label: 'Name',
                key: 'name',
                width: 3,
                getLabel: ({ row }) => row.name,
                prefix: ({ row }) => {
                  return h(Avatar, {
                    shape: 'circle',
                    image: row.user_image,
                    size: 'sm',
                  });
                },
              },
              {
                label: 'Email',
                key: 'email',
                width: '200px',
              },
              {
                label: 'Role',
                key: 'role',
              },
              {
                label: 'Status',
                key: 'status',
              },
            ]"
            :rows="[
              {
                id: 1,
                name: 'John Doe',
                email: 'john@doe.com',
                status: 'Active',
                role: 'Developer',
                user_image: 'https://avatars.githubusercontent.com/u/499550',
              },
              {
                id: 2,
                name: 'Jane Doe',
                email: 'jane@doe.com',
                status: 'Inactive',
                role: 'HR',
                user_image: 'https://avatars.githubusercontent.com/u/499120',
              },
            ]"
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
              </span>
            </template>
          </ListView>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
