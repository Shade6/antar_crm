<script setup>
import { ref, watch } from "vue";
import { Button, Dialog } from "frappe-ui";
import CreateLead from "@/components/antar_ui/lead/CreateLead.vue";

import NavBar from "@/components/antar_ui/lead/nav/NavBar.vue";
import LeadTable from "@/components/antar_ui/lead/LeadTable.vue";
import { find_assignees } from "@/api/userApi.js";
import Landing from "@/components/antar_ui/lead/SingleLead/Landing.vue";
import { useSwitchStore } from "@/stores/switch";
import { useReloadStore } from "@/stores/reload";
const switchStore = useSwitchStore();
const reloadStore = useReloadStore();

const dialog2 = ref(false); // Initialize with false to handle visibility
const assignees = ref([]);
const fetch = async (data) => {
  const res = await find_assignees(data);
  if (res.statusCode == 200) {
    assignees.value = res.data;
  }
};

watch(
  () => switchStore.create_form,
  (new_) => {
    fetch(new_);
  }
);
watch(
  () => reloadStore.assignee_reload,
  (new_) => {
    fetch(new_);
  }
);
</script>

<template>
  <NavBar :assignee="assignees" />
  <div class="px-4" v-if="switchStore.create_form == null">
    <LeadTable />
  </div>
  <div v-else-if="switchStore.create_form == 'create_lead'">
    <CreateLead />
  </div>
  <div v-else>
    <Landing />
  </div>
</template>
