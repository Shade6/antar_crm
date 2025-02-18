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

const dialog2 =ref(false)
const emit = defineEmits(["refresh"]);
const router = useRouter();
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const route_list = ref([
  {
    label: "task",
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
      <Button @click="dialog2 = true"> Create Task </Button>
      <Dialog v-model="dialog2">
        <template #body-title>
          <h3>{{ task_id ? "Edit Task" : "Create Task" }}</h3>
        </template>
        <template #body-content>
          <div class="my-2">
            <span class="text-gray-500">Title</span>
            <div class="p-2">
              <TextInput
                class="border rounded-lg"
                :type="'text'"
                :ref_for="true"
                size="sm"
                variant="subtle"
                placeholder="Placeholder"
                :disabled="false"
                v-model="title_name"
              />
            </div>
          </div>

          <div class="my-2">
            <span class="text-gray-500">Description</span>
            <div class="p-1">
              <Textarea
                :variant="'outline'"
                :ref_for="true"
                size="sm"
                placeholder="Placeholder"
                :disabled="false"
                v-model="Description"
              />
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="flex">
              <FeatherIcon
                v-if="status === 'Backlog'"
                class="w-4 my-auto"
                name="circle"
              />
              <FeatherIcon
                v-if="status === 'Todo'"
                class="w-4 my-auto"
                name="target"
              />
              <FeatherIcon
                v-if="status === 'In Progress'"
                class="w-4 my-auto"
                name="leader"
              />
              <FeatherIcon
                v-if="status === 'Done'"
                class="w-4 my-auto"
                name="check-circle"
              />
              <FeatherIcon
                v-if="status === 'Canceled'"
                class="w-4 my-auto"
                name="x-circle"
              />

              <Dropdown
                class="my-auto"
                :button="{
                  label: status || 'Select Status',
                }"
                v-model="status"
                :options="[
                  {
                    label: 'Backlog',
                    onClick: () => {
                      status = 'Backlog';
                    },
                    icon: () => h(FeatherIcon, { name: 'circle' }),
                  },
                  {
                    label: 'Todo',
                    onClick: () => {
                      status = 'Todo';
                    },
                    icon: () => h(FeatherIcon, { name: 'target' }),
                  },
                  {
                    label: 'In Progress',
                    onClick: () => {
                      status = 'In Progress';
                    },
                    icon: () => h(FeatherIcon, { name: 'leader' }),
                  },
                  {
                    label: 'Done',
                    onClick: () => {
                      status = 'Done';
                    },
                    icon: () => h(FeatherIcon, { name: 'check-circle' }),
                  },
                  {
                    label: 'Canceled',
                    onClick: () => {
                      status = 'Canceled';
                    },
                    icon: () => h(FeatherIcon, { name: 'x-circle' }),
                  },
                ]"
              />
            </div>

            <div class="p-2">
              <Autocomplete
                :options="member_list"
                 v-model="member"
                :modelValue="member"
                placeholder="Select person"
              />
            </div>

            <div class="p-2">
              <DateTimePicker
                v-model="dateTimeValue"
                variant="subtle"
                placeholder="Select Date and Time"
                :disabled="false"
              />
            </div>
            <div>
              <Dropdown
                :button="{
                  label: big_status || 'Select Priority',
                }"
                v-model="big_status"
                :options="[
                  {
                    label: 'Low',
                    onClick: () => {
                      big_status = 'Low';
                    },
                    icon: () => h(FeatherIcon, { name: 'circle' }),
                  },
                  {
                    label: 'Medium',
                    onClick: () => {
                      big_status = 'Medium';
                    },
                    icon: () => h(FeatherIcon, { name: 'target' }),
                  },
                  {
                    label: 'High',
                    onClick: () => {
                      big_status = 'High';
                    },
                    icon: () => h(FeatherIcon, { name: 'leader' }),
                  },
                ]"
              />
            </div>
            <div class="mx-3">
              <Dropdown
                :button="{
                  label: type_status || 'Select Type',
                }"
                v-model="type_status"
                :options="[
                  {
                    label: 'Calling',
                    onClick: () => {
                      type_status = 'Calling';
                    },
                    icon: () => h(FeatherIcon, { name: 'circle' }),
                  },
                  {
                    label: 'Meeting',
                    onClick: () => {
                      type_status = 'Meeting';
                    },
                    icon: () => h(FeatherIcon, { name: 'target' }),
                  },
                  {
                    label: 'Event',
                    onClick: () => {
                      type_status = 'Event';
                    },
                    icon: () => h(FeatherIcon, { name: 'leader' }),
                  },
                ]"
              />
            </div>
 
          </div>
          <div class="p-1 mt-3">
            <span class="text-gray-500">Add Note</span>
              <Textarea
                :variant="'outline'"
                :ref_for="true"
                size="sm"
                placeholder="Placeholder"
                :disabled="false"
                v-model="note_text"
              />
            </div>
        </template>
        <template #actions>
          <Button @click="task_id ? update_task() : save_()" variant="solid">
            Confirm
          </Button>
          <Button class="ml-2" @click="dialog2 = false"> Close </Button>
        </template>
      </Dialog>
    </div>
    </div>
  </div>
</template>

<style scoped></style>