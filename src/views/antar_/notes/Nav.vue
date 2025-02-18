<script setup>
import { h, ref, watch, defineEmits, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import ListIcon from "@/components/icons/ListIcon.vue";

import {
  Button,
  FeatherIcon,
  TextInput,
  Textarea,
  Dropdown,
  Autocomplete,
  DateTimePicker,
  Dialog,
  Breadcrumbs,
} from "frappe-ui";

const emit = defineEmits(["refresh"]);
const router = useRouter();
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const dialog2 = ref(false)
const route_list = ref([
  {
    label: "notes",
    icon: "",
    route: "/antar_/notes",
  },
]);


</script>

<template>
  <div class="w-full px-6 py-3 border-b flex justify-between">
    <div class="w-1/2 flex">
      <Breadcrumbs :items="route_list">
        <template #prefix="{ item }">
          <span class="mr-1">
            {{ item.icon }}
          </span>
        </template>
      </Breadcrumbs>
    </div>

    <div class="p-1 flex">
      <div class="p-1">
      <Button @click="()=>{dialog2 = true; note_id = null; title_name = ''; content = '';}"> New Notes </Button>
      <Dialog v-model="dialog2">
        <template #body-title>
          <h3>{{note_id ? 'Edit Notes' : 'Create Notes'}}</h3>
        </template>
        <template #body-content>
          <div class="p-2">
            <span class="text-sm text-gray-500">Title</span>
            <TextInput
              :type="'text'"
              :ref_for="true"
              size="sm"
              variant="subtle"
              placeholder="Placeholder"
              :disabled="false"
             
              v-model="title_name"
              :modelValue="title_name"
            />
          </div>
          <div class="p-1">
            <Textarea
              :variant="'outline'"
              :ref_for="true"
              size="sm"
              placeholder="Placeholder"
              :disabled="false"
              label="Content"
              v-model="content" 
              :modelValue="content"
            />
          </div>
        </template>
        <template #actions>
          <Button @click="note_id ? update_note() : save_()" variant="solid"> {{note_id ? 'Update' : 'Confirm'}} </Button>
          <Button class="ml-2" @click="dialog2 = false"> Close </Button>
        </template>
      </Dialog>
    </div>
    </div>
  </div>
</template>

<style scoped></style>