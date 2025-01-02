<script setup >
import {ref,h,onMounted} from 'vue'
import {ListView} from 'frappe-ui'
import {findAllPermission} from '@/api/userApi.js'
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const permissions = ref([])
const fetch_permission = async()=>{
    const res = await findAllPermission()
    if(res.statusCode == 200){
        permissions.value = res.data.map((val, i) => ({
        id: i + 1,
        name:val.module_perm_name,
        module:val.module.module_name,
        role: val.role.role_name,
        read: val.read,
        create: val.create,
        amend: val.amend, // Assuming `user_image` is present
        delete: val.delete, // Assuming `user_image` is present
      }));
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
onMounted(fetch_permission)
</script>

<template>
    <div class="p-4">
        <ListView
        class="h-2/3"
        :columns="[
          {
            label: 'Name',
            key: 'name',
            
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
            label: 'module',
            key: 'module',
           
          },
          {
            label: 'Role',
            key: 'role',
          },
          {
            label: 'read',
            key: 'read',
          },
          {
            label: 'create',
            key: 'create',
          },
          {
            label: 'amend',
            key: 'amend',
          },
          {
            label: 'delete',
            key: 'delete',
          },
        ]"
        :rows="permissions"
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
      >
        <template #cell="{ item, row, column }">
          <span class="font-medium text-ink-gray-7">
            {{ item }}
          </span>
        </template>
      </ListView>
    </div>
</template>

<style  scoped>

</style>