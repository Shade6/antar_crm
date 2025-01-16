<script setup>
import { ref, onMounted } from "vue";
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
import { find_all_lead, delete_lead,find_all_lead_by_search } from "@/api/userApi.js";
import LeadNav from "@/components/antar_ui/lead/nav/LeadNav.vue";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import { useSwitchStore } from "@/stores/switch";

const switchStore = useSwitchStore();
const toast = useToast();
const selectedRows = ref([]);
const lead_list = ref([]);

const fetch = async () => {
  const res = await find_all_lead();
  if (res.statusCode === 200) {
    lead_list.value = res.data.map((val) => ({
      id: val.lead_id,
      name: `${val.first_name || ""} ${val.last_name || ""}`.trim(),
      organization: val.company || "no company",
      status: val.status,
      email: val.email,
      mobile: val.contact,
      assigned: val.assigned || "Not Assigned",
      modified: val.modified || new Date().toLocaleDateString(),
    }));
  } else {
    toast.error(res.message, {
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
};

const handleRowClick = (row) => {
  switchStore.changeCreateForm(row.id);
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
const handleDelete = async (data) => {
  console.log(data);
  const res = await delete_lead(data);
  if (res.statusCode == 200) {
    fetch();
    toast.success(res.message, {
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
  } else {
    toast.error(res.message, {
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
};
let debounceTimer;

const handle_search = async (data) => {
  if (debounceTimer) clearTimeout(debounceTimer);

  debounceTimer = setTimeout(async () => {
    try {
      const res = await find_all_lead_by_search(data);

      if (res.statusCode === 200) {
        lead_list.value = res.data.map((val) => ({
          id: val.lead_id,
          name: `${val.first_name || ""} ${val.last_name || ""}`.trim(),
          organization: val.company || "no company",
          status: val.status,
          email: val.email,
          mobile: val.contact,
          assigned: val.assigned || "Not Assigned",
          modified: val.modified || new Date().toLocaleDateString(),
        }));
      } else {
        toast.error(res.message, {
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
    } catch (error) {
      console.error("Error in handle_search:", error);
    }
  }, 300); // 300ms delay before executing
};

const handle_refresh = ()=>{
  fetch()
}
const handle_filter=async(data)=>{
  handle_search(data)
}
const handle_sort=async(data)=>{
  console.log(data.field)
  lead_list.value = lead_list.value.sort((a, b) => {
    console.log(a[data.field])
    if (data.sort_order === 'asc') {
      return a[data.field.value] < b[data.field.value] ? -1 : 1;
    } else {
      return a[data.field.value] > b[data.field.value] ? -1 : 1;
    }
  });
}
onMounted(fetch);
</script>

<template>
      <LeadNav @search="handle_search" @refresh="handle_refresh" @filter="handle_filter" @sort="handle_sort" />
  <ListView
    class="h-[550px] p-4"
    :columns="[
      { label: 'Name', key: 'name', icon: 'user', width: '180px' },
      { label: 'Organization', key: 'organization', width: '180px' },
      { label: 'Status', key: 'status', width: '150px' },
      { label: 'Email', key: 'email', width: '180px' },
      { label: 'Lead Score', key: 'mobile', width: '150px' },
      { label: 'Assigned To', key: 'assigned', width: '150px' },
      { label: 'Last Modified', key: 'modified', width: '150px' },
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
          { label: 'Name', key: 'name', icon: 'user' },
          { label: 'Organization', key: 'organization', icon: 'briefcase' },
          { label: 'Status', key: 'status', icon: 'check-circle' },
          { label: 'Email', key: 'email', icon: 'at-sign' },
          { label: 'Lead Score', key: 'mobile', icon: 'star' },
          { label: 'Assigned To', key: 'assigned', icon: 'user-check' },
          { label: 'Last Modified', key: 'modified', icon: 'clock' },
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
</template>

<style scoped>
:deep(.flex.items-center) {
  gap: 0.5rem;
}

.truncate-cell {
  max-width: 180px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.truncate-text {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
