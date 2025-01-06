<script setup>
import { ListView, FeatherIcon } from "frappe-ui";
</script>

<template>
  <div class="p-5">
    <ListView
      class="h-[150px]"
      :columns="[
        {
          label: 'Name',
          key: 'name',
          width: 3,
          icon: 'user',
        },
        {
          label: 'Email',
          key: 'email',
          width: '200px',
          icon: 'at-sign',
        },
        {
          label: 'Role',
          key: 'role',
          icon: 'users',
        },
        {
          label: 'Status',
          key: 'status',
          icon: 'check-circle',
        },
      ]"
      :rows="[
        {
          id: 1,
          name: 'John Doe',
          email: 'john@doe.com',
          status: 'Active',
        
          role:'Developer',
          
        },
  
      ]"
      :options="{
        onRowClick: (row) => console.log(row),
        selectable: true,
        showTooltip: true,
        resizeColumn: true,
      }"
      row-key="id"
    >
      <!-- Group Header Template -->
      <template #group-header="{ group }">
        <span class="text-base font-medium leading-6 text-gray-700">
          {{ group.group }} ({{ group.rows.length }})
        </span>
      </template>

      <!-- Row Customization -->
      <template #cell="{ column, row }">
        <!-- Render Icons for Each Cell -->
        <div class="flex items-center gap-2">
          <FeatherIcon
            :name="column.icon"
            class="h-4 w-4 text-gray-600"
          />
          <span>{{ row[column.key] }}</span>
        </div>
      </template>
    </ListView>
  </div>
</template>

<style scoped></style>
