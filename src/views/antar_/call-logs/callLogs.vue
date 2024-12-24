<script setup>
import { ListView } from "frappe-ui";
</script>

<template>
  <div class="p-5">
    <ListView
      class="h-[500px]"
      :columns="[
        {
          label: 'Name',
          key: 'name',
          width: '30%', // Ensure consistent units
        },
        {
          label: 'Email',
          key: 'email',
          width: '200px',
        },
        {
          label: 'Role',
          key: 'role',
          width: '20%',
        },
        {
          label: 'Status',
          key: 'status',
          width: '20%',
        },
      ]"
      :rows="[
        {
          group: 'Developer',
          collapsed: false,
          rows: [
            {
              id: 2,
              name: 'Gary Fox',
              email: 'gary@fox.com',
              status: 'Inactive',
              role: 'Developer',
            },
            {
              id: 6,
              name: 'Emily Davis',
              email: 'emily@davis.com',
              status: 'Active',
              role: 'Developer',
            },
            {
              id: 9,
              name: 'David Lee',
              email: 'david@lee.com',
              status: 'Inactive',
              role: 'Developer',
            },
          ],
        },
        {
          group: 'Manager',
          collapsed: false,
          rows: [
            {
              id: 3,
              name: 'John Doe',
              email: 'john@doe.com',
              status: 'Active',
              role: 'Manager',
            },
            {
              id: 8,
              name: 'Sarah Wilson',
              email: 'sarah@wilson.com',
              status: 'Active',
              role: 'Manager',
            },
          ],
        },
        {
          group: 'Designer',
          collapsed: false,
          rows: [
            {
              id: 4,
              name: 'Alice Smith',
              email: 'alice@smith.com',
              status: 'Active',
              role: 'Designer',
            },
            {
              id: 10,
              name: 'Olivia Taylor',
              email: 'olivia@taylor.com',
              status: 'Active',
              role: 'Designer',
            },
          ],
        },
        {
          group: 'HR',
          collapsed: false,
          rows: [
            {
              id: 1,
              name: 'Jane Mary',
              email: 'jane@doe.com',
              status: 'Inactive',
              role: 'HR',
            },
            {
              id: 7,
              name: 'Michael Brown',
              email: 'michael@brown.com',
              status: 'Inactive',
              role: 'HR',
            },
            {
              id: 12,
              name: 'Sophia Martinez',
              email: 'sophia@martinez.com',
              status: 'Active',
              role: 'HR',
            },
          ],
        },
        {
          group: 'Tester',
          collapsed: false,
          rows: [
            {
              id: 5,
              name: 'Bob Johnson',
              email: 'bob@johnson.com',
              status: 'Inactive',
              role: 'Tester',
            },
            {
              id: 11,
              name: 'James Anderson',
              email: 'james@anderson.com',
              status: 'Inactive',
              role: 'Tester',
            },
          ],
        },
      ]"
      :options="{
      
        selectable: true,
        showTooltip: true,
        resizeColumn: true,
      }"
      row-key="id"
    >
      <!-- Custom Group Header -->
      <template #group-header="{ group }">
        <span class="text-base font-medium leading-6 text-ink-gray-900">
          {{ group.group }} ({{ group.rows.length }})
        </span>
      </template>
    </ListView>
  </div>
</template>
