<script setup>
import Nav from "./nav/Nav.vue";
import { ListView } from "frappe-ui";
</script>

<template>
  <Nav></Nav>
  <div class="p-4">
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
</template>

<style scoped></style>
