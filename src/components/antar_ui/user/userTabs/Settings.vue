<script setup>
import { ref, defineProps, onMounted, watch, defineEmits } from "vue";
import {
  Checkbox,
  TextInput,
  TextEditor,
  Button,
  Dialog,
  Autocomplete,
} from "frappe-ui";
const props = defineProps({
  details: Object,
});
import "@/assets/toast.css";
import {
  find_user_created_email,
  find_selected_user_email,
} from "@/api/userApi.js";

import { useToast } from "vue-toast-notification";
const toast = useToast();
const user_details = ref(props.details);
const state = ref(null);
const value = ref(null);
const activeAccordion = ref(null);
const dialog2 = ref(false);
const single = ref(null);
const emil_details = ref(null);
const emit = defineEmits(["email_details"]);
const email_details = ref({
  send_notification: false,
  send_me_a_copy: false,
  allowed_in_mentions: false,
  signature: null,
  user_id: props.details.user_id,
  email_id: null,
});

const fetch_email = async () => {
  const res = await find_selected_user_email(props.details.user_id);
  if (res.statusCode == 200) {
    emil_details.value = res.data;
    if (emil_details.value) {
    email_details.value.send_me_a_copy = emil_details.value[0].send_me_a_copy;
    email_details.value.send_notification = emil_details.value[0].send_notification;
    email_details.value.allowed_in_mentions = emil_details.value[0].allowed_in_mentions;
    email_details.value.signature = emil_details.value[0].signature;
  }
  } else {
    toast.error(res.message, {
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

const setActiveAccordion = (id) => {
  if (id == "accordion2") {
    if (!emil_details.value) {
      fetch_email();
    }
  }

  activeAccordion.value = activeAccordion.value === id ? null : id;
};
const user_email = ref([]);
const fetch = async () => {
  const res = await find_user_created_email(props.details.user_id);
  if (res.statusCode == 200) {
    user_email.value = res.data.map((val, i) => ({
      label: val.email_address,
      value: val.email_id,
    }));
  } else {
    toast.error(res.message, {
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

watch(() => email_details.value, (newVal) => {

  emit("email_details", newVal);
  dialog2.value = false;
}, { deep: true });

watch(() => single.value, (newVal) => {
  toast.success("Email Added", {
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
  email_details.value.email_id = newVal;
});

onMounted(() => {

  fetch();
});
</script>

<template>
  <div>
    <div
      class="relative w-full mx-auto overflow-hidden text-sm font-normal bg-white border border-gray-200 divide-y divide-gray-200 rounded-md"
    >
      <!-- First accordion item -->
      <div class="cursor-pointer group">
        <button
          @click="setActiveAccordion('accordion1')"
          class="flex items-center justify-between w-full p-4 text-left select-none group-hover:underline"
        >
          <span>Change Password</span>
          <svg
            class="w-4 h-4 duration-200 ease-out"
            :class="{ 'rotate-180': activeAccordion === 'accordion1' }"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div
          v-show="activeAccordion === 'accordion1'"
          class="transition-all duration-200"
        >
          <div class="p-4 pt-0">
            <div class="p-2 flex gap-3">
              <span>Set New Password</span>
              <TextInput
                :type="'text'"
                :ref_for="true"
                size="sm"
                variant="subtle"
                placeholder="Placeholder"
                :disabled="false"
                modelValue=""
              />
            </div>

            <div class="p-2">
              <Checkbox
                size="sm"
                :value="false"
                v-model="state"
                label="Logout From All Devices After Changing Password"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="cursor-pointer group">
        <button
          @click="setActiveAccordion('accordion2')"
          class="flex items-center justify-between w-full p-4 text-left select-none group-hover:underline"
        >
          <span>Email</span>
          <svg
            class="w-4 h-4 duration-200 ease-out"
            :class="{ 'rotate-180': activeAccordion === 'accordion2' }"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div
          v-show="activeAccordion === 'accordion2'"
          class="transition-all duration-200"
        >
          <div class="p-4 pt-0">
            <span>Email Signature</span>
            <br />
            <div class="p-2">
              <!-- <TextEditor
                    editor-class="prose-sm min-h-[4rem] border rounded-b-lg border-t-0 p-2"
                    :content="`<table style='min-width: 75px'><colgroup><col><col><col></colgroup><tbody><tr><th colspan='1' rowspan='1'><p></p></th><th colspan='1' rowspan='1'><p></p></th><th colspan='1' rowspan='1'><p></p></th></tr><tr><td colspan='1' rowspan='1'><p></p></td><td colspan='1' rowspan='1'><p></p></td><td colspan='1' rowspan='1'><p></p></td></tr><tr><td colspan='1' rowspan='1'><p></p></td><td colspan='1' rowspan='1'><p></p></td><td colspan='1' rowspan='1'><p></p></td></tr></tbody></table>`"
                    placeholder="Type something..."
                    @change="(val) => value = val"
                    :bubbleMenu="true"
                    :fixed-menu="true"
                /> -->
              <div class="p-2">
                <Checkbox
                  size="sm"
                  :value="false"
                  v-model="email_details.send_notification"
                  label="Send Notifications For Email Threads"
                />
              </div>
              <div class="p-2">
                <Checkbox
                  size="sm"
                  :value="false"
                  v-model="email_details.send_me_a_copy"
                  label="Send Me A Copy of Outgoing Emails"
                />
              </div>
              <div class="p-2">
                <Checkbox
                  size="sm"
                  :value="false"
                  v-model="email_details.allowed_in_mentions"
                  label="Allowed In Mentions"
                />
              </div>

              <span>User Email</span>
              <br />

              <div class="relative overflow-x-auto">
                <table
                  class="w-full my-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3">id</th>
                      <th scope="col" class="px-6 py-3">Email</th>
                      <th scope="col" class="px-6 py-3">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(val, i) in emil_details"
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {{ i + 1 }}
                      </th>
                      <td class="px-6 py-4">{{ val?.email?.email_address }}</td>
                      <td class="px-6 py-4">
                        <Button variant="solid" size="sm">Remove</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Button @click="dialog2 = true"> Add Email </Button>
                <Dialog v-model="dialog2">
                  <template #body-title>
                    <h3>Manage Email</h3>
                  </template>
                  <template #body-content>
                    <div class="p-2">
                      <span>Select Email</span>
                      <br />
                      <Autocomplete
                        :options="user_email"
                        v-model="single"
                        placeholder="Select person"
                      />
                    </div>
                  </template>
                  <template #actions>
                    <Button variant="solid"> Confirm </Button>
                    <Button class="ml-2" @click="dialog2 = false">
                      Close
                    </Button>
                  </template>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ... repeat for other accordion items with 'accordion2', 'accordion3' IDs ... -->
    </div>
  </div>
</template>

<style scoped></style>
