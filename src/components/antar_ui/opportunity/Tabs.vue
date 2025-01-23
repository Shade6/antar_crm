<script setup>
  import { ref , h } from "vue";
  import Activity from "@/components/antar_ui/opportunity/single/Activity.vue";
  import Emails from "@/components/antar_ui/opportunity/single/Emails.vue";
  import Comments from "@/components/antar_ui/opportunity/single/Comment.vue";
  import Calls from "@/components/antar_ui/opportunity/single/calls.vue";
  import Tasks from "@/components/antar_ui/opportunity/single/Task.vue";
  import Notes from "@/components/antar_ui/opportunity/single/Notes.vue";
  import Attachments from "@/components/antar_ui/opportunity/single/Attachment.vue";
  const state = ref({ index: null });



  import { Tabs, Button, FeatherIcon, TextInput, Autocomplete } from "frappe-ui";
  const tabs = [
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Activity",
    content: Activity,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Emails",
    content: Emails,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Comments",
    content: Comments,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Calls",
    content: Calls,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Tasks",
    content: Tasks,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Notes",
    content: Notes,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Attachments",
    content: Attachments,
  },
];

</script>

<template>
   <Tabs class="w-full" v-model="state.index" :tabs="tabs">
        <template #tab-label="{ tab }">
          <div class="flex items-center gap-2">
            <!-- Render the icon -->
            <component :is="tab.icon" />
            <!-- Label -->
            <span>{{ tab.label }}</span>
          </div>
        </template>

        <template #default="{ tab }">
          <div class="p-5">
            <component :is="tab.content"></component>
          </div>
        </template>
      </Tabs>
</template>

<style scoped>

</style>