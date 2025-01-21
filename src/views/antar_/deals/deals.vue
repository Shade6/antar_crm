<template>
  <Nav />
  <div class="p-7">
    <ListView
    class="h-[550px] p-4"
    :columns="[
      { label: 'Name', key: 'name', icon: 'user', width: '180px' },
      { label: 'Organization', key: 'organization', width: '180px' },
      { label: 'Status', key: 'status', width: '150px' },
      { label: 'Email', key: 'email', width: '180px' },
      { label: 'Lead Score', key: 'lead_score', width: '150px' },
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
          { label: 'Lead Score', key: 'lead_score', icon: 'star' },
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
  </div>
</template>
<script setup>
import { ref } from "vue";
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
const toast = useToast();
const lead_list = ref([
  {
    id: 1,
    name: "John Doe",
    organization: "Acme Inc.",
    status: "Active",
    email: "john.doe@example.com",
    lead_score: 85,
    assigned: "Jane Smith",
    modified: "2024-01-01",
  },
]);



const handleRowClick = (row) => {
  router.push(`/antar_/deals/${row.id}`);
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
