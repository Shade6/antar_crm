<script setup>
import { ref } from "vue";
import { Tabs } from "frappe-ui";

// Set initial tab index
const state = ref(0);
</script>

<template>
  <div class="p-5">
    <Tabs
      v-model="state"
      :tabs="[
        {
          label: 'Github',
          content:
            'Github is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.',
        },
        {
          label: 'Twitter',
          content:
            'Twitter is an American microblogging and social networking service on which users post and interact with messages known as tweets.',
        },
        {
          label: 'Linkedin',
          content:
            'LinkedIn is an American business and employment-oriented online service that operates via websites and mobile apps.',
        },
      ]"
    >
      <template #default="{ tab }">
        <div class="p-5">
          {{ tab.content }}
        </div>
      </template>
    </Tabs>
  </div>
</template>

<style scoped></style>
