<script setup>
import {ref,h,onMounted} from "vue"
 import {ListView} from "frappe-ui"
 import {getCampaignLists} from "@/api/userApi.js"

 const campaign_list = ref([])

 const fetch = async()=>{
    const res = await getCampaignLists()
    if(res.statusCode == 200){
        campaign_list.value = res.data.map((val)=>({
            id: val?.id,
            name: val?.list_name,
            date:  new Intl.DateTimeFormat("en-GB").format(new Date(val?.created_at))
        }))
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
 onMounted(fetch)
 const edit = (data)=>{
    console.log(data)
 }
</script>

<template>
  <div>

    <ListView
      class="h-[150px]"
      :columns="[
        {
          label: 'Name',
          key: 'name',
          width: 1,
        },
       
        {
          label: 'Name',
          key: 'name',
        },
        {
          label: 'Created Date',
          key: 'date',
        },
        
     
      ]"
      :rows="campaign_list ?? []"
      :options="{
          getRowRoute: (row) => ({ params: { id: row } }),
        selectable: true,
        showTooltip: true,
        resizeColumn: true,
        emptyState: {
        title: 'No records found',
        description: 'Create a new record to get started',
        button: {
          label: 'New Record',
          variant: 'solid',
          
        },
      },
      }"
      
    />
  </div>
</template>

<style scoped></style>
