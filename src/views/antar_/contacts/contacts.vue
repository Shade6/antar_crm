<script setup>
import { ListView } from "frappe-ui";
</script>

<template>
    <div class="p-5">
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
                size: 'sm'
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
    :rows="[]"
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
          onClick: () => console.log('New Record'),
        },
      },
    }"
    row-key="id"
  />
</div>
    </div>
</template>

<style  scoped>

</style>