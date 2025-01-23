<template>
    <Nav />
    <div class="p-4">
      <ListView
      class="h-[550px] p-4"
      :columns="[
        { label: 'Organization ', key: 'organization', icon: 'user', width: '180px' },
        { label: 'website', key: 'website', width: '180px' },
        { label: 'industry', key: 'industry', width: '150px' },
        { label: 'annual revenue', key: 'annual_revenue', width: '180px' },
        { label: 'last modified', key: 'last_modified', width: '150px' },
      ]"
      :rows="lead_list"
      :options="{
        onRowClick: handleRowClick,
        onSelectionChange: handleSelectionChange,
        selectable: true,
        showTooltip: true,
        resizeColumn: true,
      }"
      row-key="id"
    >
      <ListHeader>
        <ListHeaderItem
          v-for="column in [
          { label: 'Organization ', key: 'organization', icon: 'user'},
          { label: 'website', key: 'website'},
          { label: 'industry', key: 'industry'},
          { label: 'annual revenue', key: 'annual_revenue' },
          { label: 'last modified', key: 'last_modified' },
          ]"
          :key="column.key"
          :item="column"
        >
          <template #prefix="{ item }">
            <FeatherIcon :name="item.icon" class="h-4 w-4" />
          </template>
        </ListHeaderItem>
      </ListHeader>
  
      <ListRows>
        <ListRow v-for="row in lead_list" :key="row.id" :row="row">
          <template #default="{ column, item }">
            <ListRowItem
              :item="item"
              :align="column.align || 'left'"
              class="truncate-cell"
            >
              <template #prefix v-if="column.key === 'name' && item.image">
                <img
                  :src="item.image"
                  class="h-6 w-6 rounded-full"
                  :alt="item.label"
                />
              </template>
            </ListRowItem>
          </template>
        </ListRow>
      </ListRows>
  
      <ListSelectBanner>
        <template #actions="{ selections, unselectAll }">
          <div class="flex gap-2">
            <Button
              variant="ghost"
              label="Delete"
              @click="handleDelete(selections)"
            />
          </div>
        </template>
      </ListSelectBanner>
    </ListView>
    </div>
  </template>
  <script setup>
  import { ref ,onMounted} from "vue";
  import { useRouter } from "vue-router";
  import {
    ListView,
    FeatherIcon,
    ListHeader,
    ListHeaderItem,
    ListRows,
    ListRow,
    ListRowItem,
    ListSelectBanner,
    Button,
  } from "frappe-ui";
  const single = ref();
  import Nav from "./nav/Nav.vue";
  const router = useRouter();
  import "@/assets/toast.css";
  import { useToast } from "vue-toast-notification";
  import { get_all_organization,delete_organization } from '@/api/userApi';
  const toast = useToast();
  const lead_list = ref([]);
  const fetch_organization = async()=>{
    const res = await get_all_organization()
    lead_list.value = res.data.map((item) => ({
        id:item.organization_id,
        organization: item.organization_name || 'N/A',
        website: item.website || 'N/A',
        industry: item.industry || 'N/A',
        annual_revenue: item.annual_revenue || 'N/A',
        last_modified: item.last_modified || 'N/A',
      }));
  }
  onMounted(async()=>{
    await fetch_organization()
  })

  const handleDelete = async(rows) => {
    const res = await delete_organization(rows) 
    if(res.statusCode === 200){ 
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
    fetch_organization()
    }
 
}
  
  
  const handleRowClick = (row) => {
    router.push(`/antar_/organizations/${row.id}`);
  };
  
  const handleSelectionChange = (rows) => {
    selectedRows.value = rows;
    if (rows.length > 0) {
      toast.success(`Selected ${rows.length} row(s)`, {
        position: "top-right",
        duration: 3000,
        dismissible: true,
        style: {
          background: "#F0FFF4",
          color: "black",
          padding: "4px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          borderLeft: "5px solid green",
        },
      });
    }
  };
  </script>
  