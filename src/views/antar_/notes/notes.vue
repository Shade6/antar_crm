<script setup>
  import Nav from "./Nav.vue"
  import {get_all_notes} from "@/api/userApi.js"
  import {ref,onMounted } from "vue"
  import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

  const array_list = ref([])


  const fetch = async()=>{
    const res  = await get_all_notes()
    if(res.statusCode == 200){
        array_list.value = res.data
    }else{
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
  }
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
  onMounted(fetch)
</script>

<template>
    <Nav />
    <div class="p-4 flex flex-wrap">
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
                  onClick: () => {
                    edit_note(notes)
                  },
                },
                {
                  label: 'Delete',
                  onClick: () => {
                    delete_note(notes)
                  },
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
            <span class=" text-sm text-black font-bold">{{
           notes.opportunity_id ? 'opportunity note' : notes.lead_id ? 'lead note' : ''
          }}</span>
          <span class="text-gray-600 text-sm">{{
            getTimeDifference(notes.created_at)
          }}</span>
        </div>
      </div>
    </div>
</template>

<style  scoped>

</style>