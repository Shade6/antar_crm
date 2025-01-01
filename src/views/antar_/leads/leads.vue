<script setup>
import { ref } from "vue";
import { Button, Dialog } from "frappe-ui";
import CreateLead from "@/components/modal/CreateLead.vue"

const dialog2 = ref(false); // Initialize with false to handle visibility

</script>

<template>
    <div class="p-5">
      <!-- Show Dialog -->
      <Button @click="dialog2 = true">
        Show Dialog
      </Button>
      <!-- Dialog Component -->
      <Dialog :show="dialog2" @hide="dialog2 = false">
        <!-- Title -->
        <template #body-title>
          <h3>Custom Title</h3>
        </template>
        <!-- Content -->
        <template #body-content>
          <p>Custom Body</p>
        </template>
        <!-- Actions -->
        <template #actions>
          <Button variant="solid">
            Confirm
          </Button>
          <Button class="ml-2" @click="dialog2 = false">
            Close
          </Button>
        </template>
      </Dialog>
      <CreateLead/>
    </div>
  </template>
  