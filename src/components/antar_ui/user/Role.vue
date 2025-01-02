<script setup >
import {ref,h,onMounted,watch} from 'vue'
import {ListView} from 'frappe-ui'
import {findAllRole} from '@/api/userApi.js'
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import { useReloadStore } from "@/stores/reload";
const ReloadStore = useReloadStore();
const toast = useToast();
const roles = ref([])
const fetch_role = async()=>{
    const res = await findAllRole()
    if(res.statusCode == 200){
        roles.value = res.data.map((val, i) => ({
        id: i + 1,
        name: `${val.role_name}`,
        type: val.role_type,
        // status: val.is_active ? "Active" : "Inactive",
        owner:val.owner,
        // created: val.role.role_name,
        created: val.created_at, // Assuming `user_image` is present
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
onMounted(fetch_role)
watch(()=>ReloadStore.reload_role,()=>{
    fetch_role()
})
</script>

<template>
    <div class="p-4">
        <ListView
        class="h-2/3"
        :columns="[
          {
            label: 'role name',
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
            label: 'role type',
            key: 'type',
           
          },
          {
            label: 'owner',
            key: 'owner',
          },
          {
            label: 'created at',
            key: 'created',
          },
        ]"
        :rows="roles"
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