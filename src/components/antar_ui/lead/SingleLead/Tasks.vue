<script setup>
import { ref, onMounted, h } from "vue";
import {
  Button,
  FeatherIcon,
  TextInput,
  Textarea,
  Dropdown,
  Autocomplete,
  DateTimePicker,
  Dialog,
} from "frappe-ui";
import { useSwitchStore } from "@/stores/switch";
import {
  create_lead_task,
  get_lead_task_by_lead_id,
  findAllUsers,
} from "@/api/userApi.js";
const switchStore = useSwitchStore();

import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const array_list = ref([]);
const Cred_status = ref(null);
const dialog2 = ref(false);

const title_name = ref("");
const Description = ref("");
const status = ref("Backlog");
const type_status = ref("Calling");
const big_status = ref("Low");
const dateTimeValue = ref(null);
const member = ref(null);
const member_list = ref([]);

const fetch = async () => {
  const user_res = await findAllUsers();
  if (user_res.statusCode == 200) {
    member_list.value = user_res.data.map((val) => ({
      label: val.first_name + " " + val.last_name,
      val: val.user_id,
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
  const res = await get_lead_task_by_lead_id(switchStore.create_form);
  if (res.statusCode == 200) {
    array_list.value = res.data;
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

const save_ = async () => {
  const data = {
    lead_id: switchStore.create_form,
    title: title_name.value,
    description: Description.value,
    type: status.value,
    big_status: big_status.value,
    user_id: member.value,
    task_data: dateTimeValue.value,
    task_status: type_status.value,
  };
  const res = await create_lead_task(data);
  if (res.statusCode == 200) {
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
      style: {
        background: "white",
        color: "black",
        padding: "4px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderLeft: "5px solid green",
      },
    });
    fetch();
    dialog2.value = false;
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

onMounted(fetch);
function formatCustomDate(dateString) {
  const date = new Date(dateString);

  // Get the day and month
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // 'Nov'

  // Format time with hours, minutes, and AM/PM
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

  return `${day} ${month}, ${formattedHours}:${minutes} ${period}`;
}
</script>

<template>
  <div class="p-3 flex justify-between">
    <span class="text-2xl font-medium"> Tasks </span>
    <div class="p-1">
      <Button @click="dialog2 = true"> Create Task </Button>
      <Dialog v-model="dialog2">
        <template #body-title>
          <h3>Create Task</h3>
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
                modelValue=""
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
                modelValue=""
                v-model="Description"
              />
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="flex">
              <FeatherIcon
                v-if="status == 'Backlog'"
                class="w-4 my-auto"
                name="circle"
              />
              <FeatherIcon
                v-if="status == 'Todo'"
                class="w-4 my-auto"
                name="target"
              />
              <FeatherIcon
                v-if="status == 'In Progress'"
                class="w-4 my-auto"
                name="leader"
              />
              <FeatherIcon
                v-if="status == 'Done'"
                class="w-4 my-auto"
                name="check-circle"
              />
              <FeatherIcon
                v-if="status == 'Canceled'"
                class="w-4 my-auto"
                name="x-circle"
              />

              <Dropdown
                class="my-auto"
                :button="{
                  label: status,
                }"
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
                placeholder="Select person"
              />
            </div>

            <div class="p-2">
              <DateTimePicker
                v-model="dateTimeValue"
                variant="subtle"
                placeholder="Placeholder"
                :disabled="false"
              />
            </div>
            <div>
              <Dropdown
                :button="{
                  label: big_status,
                }"
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
                  label: type_status,
                }"
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
        </template>
        <template #actions>
          <Button @click="save_" variant="solid"> Confirm </Button>
          <Button class="ml-2" @click="dialog2 = false"> Close </Button>
        </template>
      </Dialog>
    </div>
  </div>

  <div v-if="Cred_status == null">
    <div v-if="array_list.length == 0">
      <div class="flex justify-center my-24">
        <span class="text-gray-500">No task has been created</span>
      </div>
    </div>

    <div v-else>
      <div
        v-for="task in array_list"
        class="w-full p-2 rounded-md flex justify-between"
        style="border-bottom: solid 1px #e5e4e2"
      >
        <div>
          <span>{{ task.title }}</span>
          <br />
          <div class="flex my-2">
            <span class="px-2 py-1 mx-2 rounded-full bg-gray-200">{{
              task.user.first_name[0]
            }}</span>
            <span class="mx-2">{{
              task.user.first_name + " " + task.user.last_name + ". "
            }}</span>
            <FeatherIcon class="w-4 mx-2" name="calendar" />
            <span class="mx-2">{{ formatCustomDate(task.created_at) }} . </span>
            <span
              style="height: 5px; width: 5px"
              class="my-auto bg-gray-600 rounded-full mx-2"
            ></span>
            <span>{{ task.big_status }}</span>
          </div>
        </div>

        <div class="flex gap-3">
          <span>{{ task.type }}</span>

          <span>
            <Dropdown
              :button="{
                icon: 'more-horizontal',
              }"
              :options="[
                {
                  label: 'Edit',
                  onClick: () => {},
                },
                {
                  label: 'Delete',
                  onClick: () => {},
                },
              ]"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
