<script setup>
import { h } from "vue";
import ListIcon from "@/components/Icons/ListIcon.vue";
import { Dropdown, FeatherIcon, Button } from "frappe-ui";
</script>

<template>
  <div class="w-full px-6 py-3  border-b flex justify-between">
    <div class="w-1/2">
      <span class="text-gray-700 text-xl">Leads /</span>

      <Dropdown
        :options="[
          {
            group: '',
            items: [
              {
                label: 'Edit Title',
                icon: () => h(FeatherIcon, { name: 'menu' }),
              },
              {
                label: 'Manage Members',
                icon: () => h(FeatherIcon, { name: 'bar-chart-2' }),
              },
              {
                label: 'Manage Members',
                icon: () => h(FeatherIcon, { name: 'align-center' }),
              },
            ],
          },
          {
            group: '',
            items: [
              {
                label: 'Create',
                icon: () => h(FeatherIcon, { name: 'pluse-circle' }),
              },
            ],
          },
        ]"
      >
        <Button class="mx-2 hover:bg-gray-300 px-2 rounded-sm">
          <div class="flex gap-2">
            <div>
              <ListIcon />
            </div>
            <div>
              <span class="">List</span>
            </div>
          </div>
        </Button>
      </Dropdown>
    </div>
    <div>
      <div class="p-1">
        <Button
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
          Create
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
