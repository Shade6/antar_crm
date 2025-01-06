<script setup>
import { h } from "vue";
import {
  Breadcrumbs,
  TextInput,
  FeatherIcon,
  Dropdown,
  Button,
} from "frappe-ui";
</script>

<template>
  <div class="flex justify-between p-4" style="border-bottom: solid 1px #E5E4E2;">
    <div class="p-2 max-w-52">
      <TextInput placeholder="ID" type="text">
        <template #prefix>
          <FeatherIcon class="w-4" name="search" />
        </template>
      </TextInput>
    </div>

    <div class="flex justify-center items-center pr-7">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-refresh-cw"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path
              d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
            ></path>
          </svg>
        </Button>
      </div>
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
          Filter
        </Button>
      </div>
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
          Sort
        </Button>
      </div>
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
          Columns
        </Button>
      </div>
      <Dropdown
        :options="[
          {
            group: 'Manage',
            items: [
              {
                label: 'Edit Title',
                icon: () => h(FeatherIcon, { name: 'edit' }),
              },
              {
                label: 'Manage Members',
                icon: () => h(FeatherIcon, { name: 'users' }),
              },
            ],
          },
          {
            group: 'Delete',
            items: [
              {
                label: 'Delete users',
                icon: () => h(FeatherIcon, { name: 'edit' }),
              },
              {
                label: 'Delete this project',
                icon: () => h(FeatherIcon, { name: 'trash' }),
              },
            ],
          },
        ]"
      >
        <Button>
          <template #icon>
            <FeatherIcon name="more-horizontal" class="h-4 w-4" />
          </template>
        </Button>
      </Dropdown>
    </div>
  </div>
</template>

<style scoped></style>
