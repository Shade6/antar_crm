<script setup>
import { ref, onMounted } from "vue";
import { Button, FeatherIcon, Textarea, TextInput, Dialog ,Dropdown} from "frappe-ui";
import { useSwitchStore } from "@/stores/switch";
import {
  create_lead_note_attachment,
  get_lead_note_by_lead_id,
} from "@/api/userApi.js";
const switchStore = useSwitchStore();

import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const array_list = ref([]);
const dialog2 = ref(false);

const Cred_status = ref(null);
const title_name = ref("");
const content = ref("");

const fetch = async () => {
  const res = await get_lead_note_by_lead_id(switchStore.create_form);
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
    content: content.value,
    status: false,
  };
  const res = await create_lead_note_attachment(data);
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
    title_name.value = "";
    content.value = "";
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
const truncateText = (text, length) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

function getTimeDifference(dateString) {
  const givenDate = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now - givenDate;

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (days < 30) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (months < 12) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
}
</script>

<template>
  <div class="p-3 flex justify-between">
    <span class="text-2xl font-medium"> Notes </span>
    <div class="p-1">
      <Button @click="dialog2 = true"> New Notes </Button>
      <Dialog v-model="dialog2">
        <template #body-title>
          <h3>Create Notes</h3>
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
              modelValue=""
              v-model="title_name"
            />
          </div>
          <div class="p-1">
            <Textarea
              :variant="'outline'"
              :ref_for="true"
              size="sm"
              placeholder="Placeholder"
              :disabled="false"
              modelValue=""
              label="Content"
              v-model="content"
            />
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
      <div class="text-center">
        <span class="text-gray-500">Notes was empty</span>
      </div>
    </div>

    <div class="flex flex-wrap gap-2" v-else>
      <div
        class="p-3 m-3 w-[300px] h-[250px] bg-gray-50 rounded-md"
        v-for="notes in array_list"
      >
        <div class="flex justify-between my-2">
          <span class="truncate text-2xl">{{ notes.title }}</span>
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
        </div>
        <div class="h-[70%] overflow-auto">
          <p class="text-gray-600">{{ notes.content }}</p>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 text-sm">{{
            notes.user.first_name + " " + notes.user.last_name
          }}</span>
          <span class="text-gray-600 text-sm">{{
            getTimeDifference(notes.created_at)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.truncate {
  display: inline-block;
  max-width: 24ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
