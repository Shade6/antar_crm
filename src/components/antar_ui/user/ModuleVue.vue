<script setup >
import {ref,h,onMounted,watch} from 'vue'
import {ListView} from 'frappe-ui'
import {findAllModule} from '@/api/userApi.js'
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
import { useReloadStore } from "@/stores/reload";
const ReloadStore = useReloadStore();
const modules = ref([])
const fetch_module = async()=>{
    const res = await findAllModule()
    if(res.statusCode == 200){
        modules.value = res.data.map((val, i) => ({
        id: i + 1,
        name: val.module_name,
        type: val.docs_type,
        active: val.is_active ? "Active" : "Inactive",
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
onMounted(fetch_module)
watch(()=>ReloadStore.reload_module,()=>{
    fetch_module()
})
</script>

<template>
    <div class="p-4">
        <ListView
        class="h-2/3"
        :columns="[
          {
            label: 'name',
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
            label: 'docs type',
            key: 'type',
           
          },
          {
            label: 'active',
            key: 'active',
          }
        ]"
        :rows="modules"
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