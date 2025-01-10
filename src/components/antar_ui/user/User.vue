<script setup>
import { ref ,onMounted,watch,computed} from "vue";
import {
  ListView,
  ListSelectBanner,
  ListRows,
  ListRowItem,
  FeatherIcon,
} from "frappe-ui";
import {findAllUsers} from '@/api/userApi.js'
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import { useReloadStore } from "@/stores/reload.js";
const ReloadStore = useReloadStore();
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const single = ref();
const users = ref([])
const fetch_users=async()=>{
  const res = await findAllUsers()
  
  if(res.statusCode == 200){
    users.value = res.data.map((val, i) => ({
        id:val.user_id,
        name: `${val.first_name} ${val.last_name}`,
        email: val.email,
        status: val.enabled ? "Active" : "Inactive",
        role: val.role.role_name,
        user_image: val.user_image, // Assuming `user_image` is present
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
onMounted(()=>{
  fetch_users()
})
watch(()=>ReloadStore.reload_user,()=>{
  fetch_users()
})
const handleRowClick = (row) => {
  router.push({
    name: 'user-settings-detail', // Add the route name
    params: { id: row.id }
})
};

</script>

<template>
  <div  class="p-1">
    <div class="p-7">
      <ListView
        class="h-2/3"
        :columns="[
          {
            label: 'Name',
            key: 'name',
            
            getLabel: ({ row }) => row.user_id,
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
     :rows="users"
      :options="{
        selectable: true,
        showTooltip: true,
        resizeColumn: true,
        onRowClick: (row) => handleRowClick(row),
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
    <span class="font-medium text-ink-gray-7 cursor-pointer">
      {{ item }}
    </span>
  </template>
</ListView>
    </div>
  </div>
</template>

<style scoped></style>
