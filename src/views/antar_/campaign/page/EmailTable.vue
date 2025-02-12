<script setup>
import {ListView,Tabs} from 'frappe-ui'
</script>

<template>
    <div>
        <ListView
      class="h-[150px]"
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
      
      ]"
      :options="{
       
        selectable: true,
        showTooltip: true,
        resizeColumn: true,
        emptyState: {
        title: 'No Email found',
        description: 'Create a new Email to get started',
        button: {
          label: 'New Email',
          variant: 'solid',
          onClick: () => console.log('New Record'),
        },
      },
      }"
      row-key="id"
    />
    </div>
</template>

<style scoped>

</style>