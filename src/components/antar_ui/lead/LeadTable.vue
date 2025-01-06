<script setup>
import { ref, onMounted } from "vue";
import { ListView, FeatherIcon } from "frappe-ui";
import { find_all_lead } from "@/api/userApi.js";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import { useSwitchStore } from '@/stores/switch';
const switchStore = useSwitchStore();
const toast = useToast();
const lead_list = ref([]);

// Fetch data
const fetch = async () => {
  const res = await find_all_lead();
  if (res.statusCode == 200) {
    lead_list.value = res.data.map((val, i) => ({
      id: val.lead_id,
      name: val.name,
      organization: "john@doe.com",
      status: val.status,
      email: val.email,
      mobile: val.contact,
      assigned: "not yet",
      modified: "dd",
    }));
  } else {
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
};

// Handle row click
const handleRowClick = (row) => {
  switchStore.changeCreateForm(row.id)
  row.id
};

onMounted(fetch);
</script>

<template>
  <div class="p-5">
    <!-- ListView Component -->
    <ListView
      v-if="lead_list"
      class="h-[150px]"
      :columns="[
        { label: 'Name', key: 'name', icon: 'user', width: '180px' },
        { label: 'Organization', key: 'organization', width: '180px' },
        { label: 'Status', key: 'status', width: '150px' },
        { label: 'Email', key: 'email', width: '180px' },
        { label: 'Mobile No', key: 'mobile', width: '150px' },
        { label: 'Assigned To', key: 'assigned', width: '150px' },
        { label: 'Last Modified', key: 'modified', width: '150px' },
      ]"
      :rows="lead_list"
      :options="{
        onRowClick: (row) => handleRowClick(row),
        selectable: true,
        showTooltip: true,
        resizeColumn: true,
        emptyState: {
          title: 'No data available',
          description: 'Please check back later.',
        },
      }"
      row-key="id"
    >
      <!-- Group Header Template -->
      <template #group-header="{ group }">
        <span class="text-base font-medium leading-6 text-gray-700">
          {{ group.group }} ({{ group.rows.length }})
        </span>
      </template>

      <!-- Row Customization -->
      <template #cell="{ column, row }">
        <!-- Conditionally Render Icons for Each Cell -->
        <div class="flex items-center gap-2 truncate-cell">
          <!-- Only show icon if present -->
          <FeatherIcon
            v-if="column.icon"
            :name="column.icon"
            class="h-4 w-4 text-gray-600"
          />
          <span class="truncate-text">{{ row[column.key] }}</span>
        </div>
      </template>
    </ListView>
  </div>
</template>

<style scoped>
/* Style adjustments */
:deep(.flex.items-center) {
  gap: 0.5rem; /* Default gap between icon and text */
}
.truncate-cell {
  max-width: 180px; /* Maximum width for the cell */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.truncate-text {
  display: inline-block;
  max-width: 100%; /* Ensure it doesn't overflow */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
