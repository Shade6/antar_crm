<script setup>
import { ref } from "vue";
import { get_lead_activity } from "@/api/userApi.js";
import { Button, FeatherIcon } from "frappe-ui";
import { useSwitchStore } from "@/stores/switch";
import Tasks from "./ActivityCom/Tasks.vue";
import Notes from "./ActivityCom/Notes.vue";
import Comment from "./ActivityCom/comment.vue";
import Attachments from "./ActivityCom/Attachments.vue";
const switchStore = useSwitchStore();
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const array_list = ref([]);
const fetch = async () => {
  const res = await get_lead_activity(switchStore.create_form);
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
fetch();
function formatCustomDate(dateString) {
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
    <span class="text-2xl font-medium"> Activity </span>
    <!-- <div class="p-1">
      <Button
        style="width: 100px"
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
      >
        <div class="flex justify-start">
          <FeatherIcon class="w-4" name="plus" /> <span>New</span>
        </div>
      </Button>
    </div> -->
  </div>
  <div>


    <ol class="relative border-s border-gray-200 dark:border-gray-700">
      <li v-for="(item,index) in array_list"  class="mb-10 ms-6">
        <span
          class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
        >
          <svg
            class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
            />
          </svg>
        </span>
        <h3
          class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
        >
        {{item?.user?.first_name || 'not found'}} {{item?.user?.last_name || 'not found'}} was {{item?.action || 'cannot find action'}}  {{item?.module_name?.split('_')?.join(' ') || 'cannot find name'}}  
          <span
            class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3"
            >{{formatCustomDate(JSON.parse(item.change).created_at) }}</span
          >
        </h3>
        <div v-if="item.module_name=='lead_note'">
          <Notes :details="item" />
        </div>
        <div v-if="item.module_name=='lead_task'">
          <Tasks :details="item" />
        </div>
        <div v-if="item.module_name=='lead_comment'">  
          <Comment :details="item" />
        </div>
        <div v-if="item.module_name=='lead_attachment'">
           <Attachments :details="item" />
        </div>
      </li>
      
      
    </ol>
  </div>
</template>

<style scoped></style>
