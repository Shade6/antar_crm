<script setup>
import { Breadcrumbs,TabButtons } from "frappe-ui";
</script>

<template>
  <div class="p-3 w-100 border flex">
    <Breadcrumbs
      :items="[
        {
          label: 'Home',
          icon: '🏡',
          
        },
        {
          label: 'Views',
          icon: '🏞️',
         
        },
        {
          label: 'List',
          icon: '📃',
          
        },
      ]"
    >
      <template #prefix="{ item }">
        <span class="mr-1">
          {{ item.icon }}
        </span>
      </template>
    </Breadcrumbs>
    <div class="flex mx-10">
  <TabButtons
    :buttons="[
      {
        label: 'Tasks assigned to me',
        value: 'mytasks',
      },
      {
        label: 'Tasks created by me',
        value: 'created',
      },
    ]"
    v-model="currentTab"
  />
</div>
  </div>
  
</template>

<style scoped></style>
