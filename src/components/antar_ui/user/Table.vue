<script setup>
import { ref, defineProps } from "vue";
import { Checkbox } from "frappe-ui";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import {permission_giver} from '@/api/userApi.js'
import { useReloadStore } from "@/stores/reload";
const ReloadStore = useReloadStore();

const toast = useToast();
// Define props
defineProps({
  permissions: {
    type: Array, // Changed type to Array since 'permissions' is iterated in v-for
    required: true,
  },
});

const handle_checkbox = async(data,id)=>{

   const res = await permission_giver({access:data,permission_id:id})
  if(res.statusCode == 200){
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
      style: {
        background: "white",
        color: "black",
        padding: "4px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderLeft: "5px solid green",
      },
    });
    ReloadStore.set_permission_reload()
  }else{
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
      style: {
        background: "#FFF5F5",
        color: "black",
        padding: "4px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderLeft: "5px solid red",
      },
    });
  }
 
}
</script>

<template>
  <div>
    <table class="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Document type
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Role
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Permissions
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>

      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(data, index) in permissions" :key="index">
          <!-- Document type -->
          <td class="py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="ml-4">
                <div class="text-sm font-semibold text-gray-800">
                  {{ data.module.module_name }}
                </div>
              </div>
            </div>
          </td>

          <!-- Role -->
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-semibold text-gray-800">
              {{ data.role.role_name }}
            </div>
          </td>

          <!-- Permissions -->
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex">
            <!-- Permission Checkboxes -->
            <div>
              <div class="p-2">
                <Checkbox
                  size="sm"
                  v-model="data.read" 
                  label="Read"
                  @update:modelValue="handle_checkbox('read', data.module_permission_id)"
                />
              </div>
              <div class="p-2">
                <Checkbox
                  size="sm"
                  v-model="data.create" 
                  label="Create"
                  @update:modelValue="handle_checkbox('create', data.module_permission_id)"
                />
              </div>
            </div>

            <div>
              <div class="p-2">
                <Checkbox
                  size="sm"
                  v-model="data.amend" 
                  label="Amend"
                 @update:modelValue="handle_checkbox('amend', data.module_permission_id)"
                />
              </div>
              <div class="p-2">
                <Checkbox
                  size="sm"
                  v-model="data.delete" 
                  label="Delete"
                 @update:modelValue="handle_checkbox('delete', data.module_permission_id)"
                />
              </div>
            </div>

            <div>
              <div class="p-2">
                <Checkbox
                  size="sm"
                  v-model="data.import" 
                  label="Import"
                  @update:modelValue="handle_checkbox('import', data.module_permission_id)"
                />
              </div>
              <div class="p-2">
                <Checkbox
                  size="sm"
                  v-model="data.export" 
                  label="Export"
               @update:modelValue="handle_checkbox('export', data.module_permission_id)"
                />
              </div>
            </div>
          </td>

          <!-- Actions -->
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button v-if="data.role.is_deletable" class="ml-2 text-red-600 hover:text-red-900">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
