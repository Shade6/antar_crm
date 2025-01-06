<script setup>
import { ref } from "vue";
import { Button, Dialog } from "frappe-ui";
import CreateLead from "@/components/antar_ui/lead/CreateLead.vue";
import LeadNav from "@/components/antar_ui/lead/nav/LeadNav.vue";
import LeadTable from "@/components/antar_ui/lead/LeadTable.vue";
import Navbar from "@/components/layouts/navbar.vue";
import Landing from "@/components/antar_ui/lead/SingleLead/Landing.vue";
import { useSwitchStore } from "@/stores/switch";
const switchStore = useSwitchStore();

const dialog2 = ref(false); // Initialize with false to handle visibility
</script>

<template>
  <Navbar />
  <div v-if="switchStore.create_form == null">
    <LeadNav />
    <LeadTable />
  </div>
  <div v-else-if="switchStore.create_form == 'create_lead'">
    <CreateLead />
  </div>
  <div v-else>
    <Landing />
  </div>
</template>
