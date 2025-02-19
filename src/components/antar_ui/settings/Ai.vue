<script setup>
import { onMounted, ref } from "vue";
import { Button, Dialog, Autocomplete, TextInput, Switch } from "frappe-ui";
const checked = ref({
  organization: false,
  contact: false,
  recurring:false
});
</script>

<template>
  <div class="p-3 border-b w-full flex justify-between">
    <span
      ><a href="/antar_/settings">Settings</a> /
      <span v-if="current_page">Campaign Email List</span
      ><span v-else> Manage Ai </span></span
    >
    <div class="p-1">
      <Button
        v-if="current_page"
        variant="solid"
        theme="gray"
        size="sm"
        @click="changeView"
      >
        Ai Management
      </Button>
      <div class="flex" v-else>
        <div class="mx-2">
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
            @click="changeView"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  </div>
  <div class="p-4">
    
    

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Ai Usage
                </th>
                <th scope="col" class="px-6 py-3">
                    State
                </th>
              
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    AI to convert Lead to Opportunity
                </th>
                <td class="px-6 py-4">
                    online
                </td>
                <td class="px-6 py-4">
                    <Switch
                        size="sm"
                         class="w-10"
                        description=""
                        :disabled="false"
                        v-model="checked.contact"
                    />
                </td>
              
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    AI to create Lead
                </th>
                <td class="px-6 py-4">
                    online
                </td>
                <td class="px-6 py-4">
                    <Switch
                        size="sm"
                         class="w-10"
                        description=""
                        :disabled="false"
                        v-model="checked.contact"
                    />
                </td>
               
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    AI to create Opportunity
                </th>
                <td class="px-6 py-4">
                    online
                </td>
                <td class="px-6 py-4">
                    <Switch
                        size="sm"
                         class="w-10"
                        description=""
                        :disabled="false"
                        v-model="checked.contact"
                    />
                </td>
            
            </tr>
        </tbody>
    </table>
</div>

  </div>
</template>

<style scoped></style>
