<script setup>
import Nav from "./Nav.vue";
import { get_all_task } from "@/api/userApi.js";
import { ref, onMounted } from "vue";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const array_list = ref([]);

const fetch = async () => {
  const res = await get_all_task();
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
onMounted(fetch);
</script>

<template>
  <Nav />
  <div class="p-5 flex flex-wrap gap-3">
    <div v-for="data in array_list" class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-xl font-semibold text-gray-800">{{ data.title }}</h3>
        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >{{ data.type }}</span
        >
      </div>

      <p class="text-gray-600 mb-4">{{ data.description }}</p>

      <div class="flex gap-4 mb-4">
        <div>
          <p class="text-sm text-gray-500">Status</p>
          <p class="text-gray-700">{{ data.task_status }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Priority</p>
          <p class="text-gray-700">{{ data.big_status }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Created At</p>
          <p class="text-gray-700">{{ new Date(data.created_at).toLocaleString() }}</p>
        </div>
      
      </div>
      <div class="my-3 w-full" v-if="data.lead_id">
        <span class="w-full p-1 px-2 bg-green-100 rounded-md shadow-md">created for lead</span>
       
        </div>
        <div class="my-3 w-full" v-else-if="data.opportunity_id">
          <span class="w-full p-1 px-2 bg-violet-100 rounded-md shadow-md"> created for opportunity</span>

          
        </div>
     

      <div class="border-t pt-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <span
              class="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center"
            >
              {{ data.user.first_name[0] }}
            </span>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">{{ data?.user?.first_name+" "+ data?.user?.last_name }}</p>
            <p class="text-sm text-gray-500">test1@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
