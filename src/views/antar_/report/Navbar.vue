<script setup>
import { h, ref, watch, defineEmits, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import ListIcon from "@/components/icons/ListIcon.vue";
import {
  Dropdown,
  FeatherIcon,
  Button,
  Breadcrumbs,
} from "frappe-ui";

const emit = defineEmits(["refresh"]);
const router = useRouter();
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const route_list = ref([
  {
    label: "report",
    icon: "",
    route: "/antar_/report",
  },
]);

const timer = ref(0); // Remaining time in seconds
const intervalId = ref(null); // To store the interval ID

const handle_fetch_details = () => {
  if (timer.value > 0) return; // If timer is already running, do nothing

  emit("refresh"); // Emit the refresh event

  timer.value = 120; // Set the timer to 2 minutes (120 seconds)
  intervalId.value = setInterval(() => {
    timer.value -= 1;
    if (timer.value <= 0) {
      clearInterval(intervalId.value); // Clear the interval when the timer reaches 0
      intervalId.value = null;
    }
  }, 1000); // Update the timer every second
};

// Clear the interval when the component is unmounted
onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});
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
        <Button
          :variant="'solid'"
          :ref_for="true"
          theme="gray"
          size="sm"
          :label="timer > 0 ? `Fetching... (${timer}s)` : 'Fetch Report'"
          :loading="false"
          :loadingText="null"
          :disabled="timer > 0"
          :link="null"
          @click="handle_fetch_details"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>