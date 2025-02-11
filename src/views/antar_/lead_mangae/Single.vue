<script setup >
import Nav from "./nav/Nav.vue";
import Activity from "@/components/antar_ui/lead/SingleLead/Activity.vue";
import Attachments from "@/components/antar_ui/lead/SingleLead/Attachments.vue";
import Calls from "@/components/antar_ui/lead/SingleLead/Calls.vue";
import Comments from "@/components/antar_ui/lead/SingleLead/Comments.vue";
import Notes from "@/components/antar_ui/lead/SingleLead/Notes.vue";
import Tasks from "@/components/antar_ui/lead/SingleLead/Tasks.vue";
import Emails from "@/components/antar_ui/lead/SingleLead/Emails.vue";


import { ref, h, onMounted } from "vue";
import { Tabs, Button, FeatherIcon, TextInput, Autocomplete } from "frappe-ui";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
import { useRoute } from "vue-router";
const route = useRoute(); // Get the current route
const lead_route_id = route.params.id;


const tabsWidth = ref(70);
const sidebarWidth = ref(30);
const state = ref({ index: null });
const details = ref({
  lead_id: null,
  company: null,
  website: null,
  lead_source: null,
  salutation: null,
  first_name: null,
  last_name: null,
  email: null,
  contact: null,
});
const assignees = ref([]);
const person_tab = ref(true);
const details_tab = ref(true);
const lead_scoring_active = ref(false);
const lead_owner = ref(null);
const user_list = ref([]);
const territory_list = ref([]);
const industry_list = ref([]);
const form_details = ref({
  territory_id: null,
  industry_id: null,
});
const score_details = ref({
  revenue: null,
  employees: null,
  lead_score: null,
  lead_value: null,
});
const tabs = [
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Activity",
    content: Activity,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Emails",
    content: Emails,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Comments",
    content: Comments,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Calls",
    content: Calls,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Tasks",
    content: Tasks,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Notes",
    content: Notes,
  },
  {
    icon: h("v-icon", { name: "github", class: "w-4 h-4" }),
    label: "Attachments",
    content: Attachments,
  },
];

const sidebarMenus = [
  {
    id: "menu-1",
    label: "Analytics",
    icon: "bar-chart-2",
    items: ["Carnival", "Revenue"],
  },
  {
    id: "menu-2",
    label: "Reports",
    icon: "file-text",
    items: ["Monthly", "Weekly"],
  },
];

const startResizing = () => {
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResizing);
};

const resize = (e) => {
  const percentage = (e.clientX / window.innerWidth) * 100;
  console.log(percentage);
  if (percentage > 60 && percentage < 80) {
    tabsWidth.value = percentage;
    sidebarWidth.value = 100 - percentage;
  }
};

const stopResizing = () => {
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResizing);
};

import {
  find_single_lead,
  find_assignees,
  find_all_industry,
  find_all_territories,
  findAllUsers,
  update_single_lead,
} from "@/api/userApi.js";



const fetch = async () => {
  const res = await find_single_lead(lead_route_id);
  if (res.statusCode == 200) {
    details.value.lead_id = res?.data?.lead_id || "";
    details.value.company = res?.data?.company || "";
    details.value.website = res?.data?.website || "";
    details.value.lead_source = res?.data?.lead_source || "";
    details.value.salutation = res?.data?.salutation || "";
    details.value.first_name = res?.data?.first_name || "";
    details.value.last_name = res?.data?.last_name || "";
    details.value.email = res?.data?.email || "";
    details.value.contact = res?.data?.contact || "";
    score_details.value.revenue = res?.data?.revenue || "";
    score_details.value.employees = res?.data?.employees || "";
    score_details.value.lead_score = res?.data?.lead_score || "";
    score_details.value.lead_value = res?.data?.lead_value || "";
    if (res?.data?.industry) {
      form_details.value.industry_id = {
        label: res?.data?.industry?.industry_name || "",
        value: res?.data?.industry?.industry_id || "",
      };
    }
    if (res?.data?.territory) {
      form_details.value.territory_id = {
        label: res?.data?.territory?.territory_name || "",
        value: res?.data?.territory?.territory_id || "",
      };
    }
    if (res?.data?.assignee) {
      lead_owner.value = {
        label:
          (res?.data?.assignee?.first_name || "") +
          " " +
          (res?.data?.assignee?.last_name || ""),
        value: res?.data?.assignee?.user_id || "",
      };
    }
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
const fetch_territory = async () => {
  const res = await find_all_territories();
  if (res.statusCode == 200) {
    territory_list.value = res.data.map((val, i) => ({
      label: val.territory_name,
      value: val.territory_id,
    }));
  } else {
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};
const fetch_industry = async () => {
  const res = await find_all_industry();
  if (res.statusCode == 200) {
    industry_list.value = res.data.map((val, i) => ({
      label: val.industry_name,
      value: val.industry_id,
    }));
  } else {
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};
const fetch_users = async () => {
  const res = await findAllUsers();
  if (res.statusCode == 200) {
    user_list.value = res.data.map((val, i) => ({
      label: val?.first_name + " " + val?.last_name,
      value: val.user_id,
    }));
  } else {
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};
const update_lead = async () => {
  const res = await update_single_lead({
    ...details.value,
    territory_id: form_details.value.territory_id.value,
    industry_id: form_details.value.industry_id.value,
    revenue: score_details.value.revenue,
    employees: score_details.value.employees,
  });

  if (res.statusCode === 200) {
    fetch()
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

onMounted(async () => {
  await fetch_territory();
  await fetch_industry();
  await fetch_users();
  await fetch();
});



</script>

<template>
     <Nav />
     <div class="flex h-[675px]">
    <!-- Tabs Component -->
    <div class="flex-grow" :style="{ width: tabsWidth + '%' }">
      <Tabs class="w-full" v-model="state.index" :tabs="tabs">
      
        <template #tab-label="{ tab }">
          
          <div class="flex items-center gap-2">
            <!-- Render the icon -->
            <component :is="tab.icon" />
            <!-- Label -->
           
          </div>
       
        </template>

        <template #default="{ tab }">
          <div class="p-5">
          
            <component :is="tab.content"></component>
          </div>
        </template>
      </Tabs>
    </div>

    <!-- Resizable Handle -->
    <div
      class="cursor-col-resize bg-gray-400 w-1 h-full"
      @mousedown="startResizing"
    ></div>

    <!-- Resizable Sidebar -->
    <div class="" :style="{ width: sidebarWidth + '%' }">
      <div class="p-2 border w-full">
        <span class="font-bold">{{ "CRM -" + lead_route_id ?? "" }}</span>
      </div>
      <div class="p-2 border w-full flex">
        <img
          width="70"
          src="https://i.pinimg.com/736x/4a/ca/fe/4acafecd9b6e8bf88b2b80b971e338eb.jpg"
          alt=""
        />
        <div>
          <span class="my-auto text-3xl font-semibold">{{
            details?.salutation +
            " " +
            details?.first_name +
            " " +
            details?.last_name
          }}</span>
          <div class="flex">
            <div class="p-1">
              <Button
                variant="subtle"
                theme="gray"
                size="sm"
                label="Phone"
                title="Call contact"
              >
                <FeatherIcon class="w-4" name="phone" />
              </Button>
            </div>
            <div class="p-1">
              <Button
                variant="subtle"
                theme="gray"
                size="sm"
                label="Mail"
                title="Send email"
              >
                <FeatherIcon class="w-4" name="mail" />
              </Button>
            </div>
            <div class="p-1">
              <Button
                :variant="'subtle'"
                :ref_for="true"
                theme="gray"
                size="sm"
                label="Button"
                :loading="false"
                :loadingText="null"
                :disabled="false"
                :link="null"
                title="Copy contact link"
              >
                <FeatherIcon class="w-4" name="link-2" />
              </Button>
            </div>
            <div class="p-1">
              <Button
                variant="subtle"
                theme="gray"
                size="sm"
                label="Attach"
                title="Attach files"
              >
                <FeatherIcon class="w-4" name="paperclip" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <div
        style="
          height: 80%;
          overflow-y: scroll;
          font-family:
            Optima,
            Segoe,
            Segoe UI,
            Candara,
            Calibri,
            Arial,
            sans-serif;
        "
      >
        <div>
          <div>
            <div class="flex justify-between p-3">
              <div class="flex">
                <FeatherIcon
                  v-if="details_tab"
                  class="w-4 mx-3"
                  name="chevron-down"
                />
                <FeatherIcon v-else class="w-4 mx-3" name="chevron-right" />
                <span class="my-auto">details</span>
              </div>
              <div>
                <div class="p-1">
                  <Button
                    :variant="'subtle'"
                    :ref_for="true"
                    theme="gray"
                    size="sm"
                    label="Button"
                    :loading="false"
                    :loadingText="null"
                    :disabled="false"
                    :link="null"
                    @click="update_lead"
                  >
                    update
                  </Button>
                </div>
              </div>
            </div>
            <div v-if="details_tab" class="px-6">
              <div
                :class="[
                  'flex justify-between p-2 rounded-md',
                  {
                    'bg-orange-100': score_details.lead_value === 'Hot',
                    'bg-yellow-100': score_details.lead_value === 'Warm',
                    'bg-blue-100': score_details.lead_value === 'Cold',
                  },
                ]"
              >
                <span>Lead Score:{{ score_details.lead_score }} </span>
                <div class="flex">
                  <span>{{ score_details.lead_value +" Lead" }}</span>
                  <svg
                    v-if="score_details.lead_value === 'Hot'"
                    width="30"
                    height="30"
                    xmlns="http://www.w3.org/2000/svg"
                    xml:space="preserve"
                    id="flame"
                    x="0"
                    y="0"
                    version="1.1"
                    viewBox="0 0 52 52"
                  >
                    <path
                      fill="#FFC1C3"
                      d="M38.433 43.792c-3.53 3.94-8.43 6.21-13.45 6.21-1.33 0-2.66-.17-3.95-.49-3.56-.88-6.6-2.82-9.05-5.77-.08-.1-6.86-8.8-.57-19.18.34-.55.72-1.05 1.02-1.43 2.74-3.45 5.42-8.22 3.96-10.33a.994.994 0 0 1 .01-1.13c.23-.35.66-.51 1.06-.4.39.09 3.41 1.04 4.06 7.02.66-1.4 1.24-3.27 1.1-5.4-.21-3.23-1.98-6.3-5.27-9.14a.992.992 0 0 1-.22-1.23c.22-.41.71-.62 1.15-.48.23.06 21.6 6.54 18.36 28.69 1.25-1.34 2.64-3.94 2.3-8.7-.03-.47.26-.89.7-1.03.45-.14.93.05 1.16.45.07.12 6.82 12.07-2.37 22.34z"
                      style="fill: #ffc1c3"
                    ></path>
                  </svg>
                  <svg
                    v-if="score_details.lead_value === 'Cold'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    id="cold-thermometer"
                    width="30"
                    height="30"
                    class="mx-2"
                  >
                    <g>
                      <path
                        fill="#333"
                        d="M7 9H4a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2zm0 16H4a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2zm0-8H4a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2zm0-4H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm0 8H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm0 8H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M33 24a4 4 0 1 1 4-4 4.004 4.004 0 0 1-4 4Zm0-6a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2Z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M33 18a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1Z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M33.018 12.767a.999.999 0 0 1-.707-.292l-1.668-1.667a1 1 0 0 1 1.414-1.415l1.668 1.667a1 1 0 0 1-.707 1.707Z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M33.018 12.767a1 1 0 0 1-.715-1.7L33.936 9.4a1 1 0 1 1 1.43 1.4l-1.633 1.666a.997.997 0 0 1-.715.301zm2.102 6.113a1 1 0 0 1-.707-1.707l5.66-5.66a1 1 0 0 1 1.414 1.414l-5.66 5.66a.997.997 0 0 1-.707.293z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M38.834 15.19a1 1 0 0 1-1-1v-2.357a1 1 0 1 1 2 0v2.358a1 1 0 0 1-1 1Z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M38.834 15.19a1 1 0 0 1-.01-2l2.332-.024h.011a1 1 0 0 1 .01 2l-2.332.025zM44 21h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M41.232 21.017a1 1 0 0 1-.707-1.707l1.668-1.667a1 1 0 0 1 1.414 1.415l-1.667 1.667a.999.999 0 0 1-.708.292Z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M42.9 22.65a.995.995 0 0 1-.7-.286l-1.667-1.633a1 1 0 1 1 1.398-1.428l1.669 1.633a1 1 0 0 1-.7 1.714zm-2.12 6.13a.997.997 0 0 1-.707-.293l-5.66-5.66a1 1 0 0 1 1.414-1.414l5.66 5.66a1 1 0 0 1-.707 1.707z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M41.167 26.834H38.81a1 1 0 0 1 0-2h2.357a1 1 0 0 1 0 2Z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M38.834 29.167a1 1 0 0 1-1-.99l-.024-2.333a1 1 0 0 1 .99-1.01h.01a1 1 0 0 1 1 .99l.024 2.333a1 1 0 0 1-.989 1.01zM33 32a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M34.65 30.9a.998.998 0 0 1-.707-.292l-1.668-1.668a1 1 0 0 1 1.414-1.415l1.668 1.667a1 1 0 0 1-.707 1.708Z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M31.35 30.9a1 1 0 0 1-.715-1.7l1.633-1.667a1 1 0 0 1 1.43 1.4L32.065 30.6a.997.997 0 0 1-.715.3zm-6.13-2.12a1 1 0 0 1-.707-1.707l5.66-5.66a1 1 0 0 1 1.414 1.414l-5.66 5.66a.997.997 0 0 1-.707.293z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M27.166 29.167a1 1 0 0 1-1-1v-2.358a1 1 0 0 1 2 0v2.358a1 1 0 0 1-1 1Z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M24.833 26.834a1 1 0 0 1-.01-2l2.332-.025h.011a1 1 0 0 1 .011 2l-2.334.024zM30 21h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M23.1 22.65a1 1 0 0 1-.707-1.707l1.667-1.667a1 1 0 1 1 1.415 1.414l-1.668 1.667a.997.997 0 0 1-.707.293Z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M24.767 20.983a.997.997 0 0 1-.7-.286L22.4 19.064a1 1 0 1 1 1.4-1.428l1.667 1.633a1 1 0 0 1-.7 1.714zm6.113-2.103a.997.997 0 0 1-.707-.293l-5.66-5.66a1 1 0 1 1 1.414-1.414l5.66 5.66a1 1 0 0 1-.707 1.707z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M27.19 15.166h-2.357a1 1 0 0 1 0-2h2.357a1 1 0 0 1 0 2Z"
                      ></path>
                      <path
                        fill="#02bfe2"
                        d="M27.19 15.166a1 1 0 0 1-1-.99l-.024-2.333a1 1 0 0 1 .989-1.01h.01a1 1 0 0 1 1 .99l.025 2.333a1 1 0 0 1-.99 1.01Z"
                      ></path>
                      <path
                        fill="#4fd7f7"
                        d="M21 38a6.008 6.008 0 0 1-6.72 5.96 6.075 6.075 0 0 1-5.2-4.99A5.984 5.984 0 0 1 12 32.81V7a2.996 2.996 0 0 1 3-3 3.11 3.11 0 0 1 2.12.88A2.993 2.993 0 0 1 18 7v25.81A5.985 5.985 0 0 1 21 38Z"
                      ></path>
                      <path
                        fill="#8deaff"
                        d="M16.06 6a123.724 123.724 0 0 1-5.36 36.16 5.885 5.885 0 0 1-1.62-3.19A5.984 5.984 0 0 1 12 32.81V7a2.996 2.996 0 0 1 3-3 2.804 2.804 0 0 1 1.05.2c.01.6.01 1.2.01 1.8Z"
                      ></path>
                      <path
                        fill="#3364aa"
                        d="M21 38a6.008 6.008 0 0 1-6.72 5.96 6.075 6.075 0 0 1-5.2-4.99A5.984 5.984 0 0 1 12 32.81V27h6v5.81A5.985 5.985 0 0 1 21 38Z"
                      ></path>
                      <path
                        fill="#4279bd"
                        d="M14.29 27a122.96 122.96 0 0 1-3.59 15.16 5.885 5.885 0 0 1-1.62-3.19A5.984 5.984 0 0 1 12 32.81V27Z"
                      ></path>
                    </g>
                  </svg>
                  <svg
                    v-if="score_details.lead_value === 'Warm'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    id="sun"
                    width="30"
                  >
                    <defs>
                      <linearGradient
                        id="a"
                        x1="256"
                        x2="256"
                        y1="509"
                        y2="3"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stop-color="#ff6100"></stop>
                        <stop offset="1" stop-color="#fdb82e"></stop>
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#a)"
                      d="M256,396.001c-77.197,0-140.001-62.804-140.001-140.001s62.804-140.001,140.001-140.001,140.001,62.804,140.001,140.001-62.804,140.001-140.001,140.001Zm0-264.002c-68.375,0-124.001,55.626-124.001,124.001s55.627,124.001,124.001,124.001,124.001-55.627,124.001-124.001-55.626-124.001-124.001-124.001Zm41.002-21.001c-.686,0-1.382-.089-2.075-.274-4.268-1.144-6.801-5.53-5.657-9.798l7.788-29.065c1.144-4.268,5.533-6.798,9.798-5.657,4.268,1.144,6.801,5.53,5.657,9.798l-7.788,29.065c-.958,3.574-4.19,5.932-7.723,5.932Zm-41.002-5.399c-4.418,0-8-3.582-8-8V11c0-4.418,3.582-8,8-8s8,3.582,8,8V97.599c0,4.418-3.582,8-8,8Zm112.006,46.395c-2.047,0-4.095-.781-5.657-2.343-3.124-3.124-3.124-8.189,0-11.313l21.277-21.277c3.124-3.124,8.189-3.124,11.313,0,3.125,3.124,3.125,8.189,0,11.313l-21.277,21.277c-1.562,1.562-3.609,2.343-5.657,2.343Zm-32.813-25.171c-1.357,0-2.733-.346-3.993-1.073-3.826-2.209-5.137-7.102-2.928-10.928l43.3-74.997c2.209-3.826,7.102-5.139,10.928-2.928,3.826,2.209,5.137,7.102,2.928,10.928l-43.3,74.997c-1.482,2.566-4.171,4.001-6.936,4.001Zm73.806,96.183c-3.533,0-6.765-2.357-7.723-5.932-1.144-4.268,1.39-8.654,5.657-9.798l29.065-7.788c4.27-1.141,8.654,1.39,9.798,5.657,1.143,4.268-1.389,8.654-5.657,9.798l-29.065,7.788c-.693,.186-1.39,.274-2.075,.274Zm-15.812-38.204c-2.765,0-5.454-1.435-6.936-4.001-2.209-3.826-.898-8.719,2.928-10.928l74.997-43.299c3.826-2.208,8.719-.898,10.928,2.928,2.209,3.826,.898,8.719-2.928,10.928l-74.997,43.299c-1.26,.727-2.635,1.073-3.993,1.073Zm44.887,127.986c-.686,0-1.382-.089-2.075-.274l-29.066-7.788c-4.268-1.144-6.8-5.53-5.657-9.798,1.144-4.268,5.533-6.797,9.798-5.657l29.066,7.788c4.268,1.144,6.8,5.53,5.657,9.798-.958,3.574-4.19,5.932-7.723,5.932Zm62.926-48.787h-86.599c-4.418,0-8-3.582-8-8s3.582-8,8-8h86.599c4.418,0,8,3.582,8,8s-3.582,8-8,8Zm-111.716,133.284c-2.047,0-4.095-.781-5.657-2.343l-21.278-21.278c-3.124-3.124-3.124-8.189,0-11.313s8.189-3.124,11.313,0l21.278,21.278c3.125,3.124,3.125,8.189,0,11.313-1.562,1.562-3.609,2.343-5.657,2.343Zm78.885-10.783c-1.357,0-2.733-.346-3.993-1.073l-74.997-43.299c-3.826-2.209-5.137-7.102-2.928-10.928,2.209-3.827,7.102-5.139,10.928-2.928l74.997,43.299c3.826,2.209,5.137,7.102,2.928,10.928-1.482,2.566-4.171,4.001-6.936,4.001Zm-89.662,89.676c-2.765,0-5.454-1.435-6.936-4.001l-43.299-74.997c-2.209-3.826-.898-8.719,2.928-10.928,3.826-2.208,8.72-.898,10.928,2.928l43.299,74.997c2.209,3.826,.898,8.719-2.928,10.928-1.26,.727-2.635,1.073-3.993,1.073Zm-73.727-30.106c-3.533,0-6.765-2.357-7.723-5.931l-7.788-29.066c-1.144-4.268,1.389-8.654,5.657-9.798,4.27-1.141,8.654,1.39,9.798,5.657l7.788,29.066c1.144,4.268-1.389,8.654-5.657,9.798-.693,.186-1.39,.274-2.075,.274Zm-48.78,62.929c-4.418,0-8-3.582-8-8v-86.599c0-4.418,3.582-8,8-8s8,3.582,8,8v86.599c0,4.418-3.582,8-8,8Zm-48.78-62.929c-.686,0-1.382-.089-2.075-.274-4.268-1.144-6.801-5.53-5.657-9.798l7.788-29.065c1.144-4.268,5.532-6.798,9.798-5.657,4.268,1.144,6.801,5.53,5.657,9.798l-7.788,29.065c-.958,3.574-4.19,5.932-7.723,5.932Zm-73.728,30.106c-1.357,0-2.733-.346-3.993-1.073-3.826-2.209-5.137-7.102-2.928-10.928l43.3-74.997c2.209-3.827,7.103-5.139,10.928-2.928,3.826,2.209,5.137,7.102,2.928,10.928l-43.3,74.997c-1.482,2.566-4.171,4.001-6.936,4.001Zm-10.776-78.894c-2.047,0-4.095-.781-5.657-2.343-3.124-3.124-3.124-8.189,0-11.313l21.277-21.277c3.124-3.124,8.189-3.124,11.313,0s3.124,8.189,0,11.313l-21.277,21.277c-1.562,1.562-3.609,2.343-5.657,2.343Zm-78.885-10.783c-2.765,0-5.454-1.435-6.936-4.001-2.209-3.826-.898-8.719,2.928-10.928l74.997-43.299c3.826-2.208,8.719-.897,10.928,2.928,2.209,3.826,.898,8.719-2.928,10.928l-74.997,43.299c-1.26,.727-2.635,1.073-3.993,1.073Zm30.095-73.714c-3.533,0-6.765-2.357-7.723-5.931-1.144-4.268,1.389-8.655,5.657-9.798l29.064-7.788c4.27-1.142,8.655,1.389,9.798,5.657,1.144,4.268-1.389,8.655-5.657,9.798l-29.065,7.788c-.694,.186-1.391,.274-2.076,.274Zm23.672-48.788H11c-4.418,0-8-3.582-8-8s3.582-8,8-8H97.598c4.418,0,8,3.582,8,8s-3.582,8-8,8Zm5.402-40.995c-.686,0-1.382-.089-2.076-.274l-29.065-7.788c-4.268-1.144-6.8-5.53-5.657-9.798,1.144-4.267,5.53-6.798,9.798-5.657l29.065,7.788c4.268,1.144,6.8,5.53,5.657,9.798-.958,3.574-4.19,5.931-7.723,5.931Zm15.812-38.204c-1.357,0-2.733-.346-3.993-1.073l-74.997-43.299c-3.826-2.209-5.137-7.102-2.928-10.928,2.209-3.827,7.102-5.138,10.928-2.928l74.997,43.299c3.826,2.209,5.137,7.102,2.928,10.928-1.482,2.566-4.171,4.001-6.936,4.001Zm25.18-32.807c-2.047,0-4.095-.781-5.657-2.343l-21.278-21.277c-3.124-3.124-3.125-8.189,0-11.313,3.124-3.124,8.189-3.124,11.313,0l21.278,21.277c3.124,3.124,3.125,8.189,0,11.313-1.562,1.562-3.609,2.343-5.657,2.343Zm32.813-25.172c-2.765,0-5.454-1.435-6.936-4.001L126.572,47.824c-2.209-3.826-.898-8.719,2.928-10.928,3.826-2.208,8.719-.897,10.928,2.928l43.299,74.997c2.209,3.826,.898,8.719-2.928,10.928-1.26,.727-2.635,1.073-3.993,1.073Zm38.191-15.824c-3.533,0-6.765-2.357-7.723-5.931l-7.788-29.066c-1.144-4.268,1.389-8.654,5.657-9.798,4.268-1.142,8.654,1.39,9.798,5.657l7.788,29.066c1.144,4.268-1.389,8.654-5.657,9.798-.693,.186-1.39,.274-2.075,.274Zm49.002,247.008c0-4.418-3.582-8-8-8-51.835,0-94.006-42.171-94.006-94.006,0-4.418-3.582-8-8-8s-8,3.582-8,8c0,60.657,49.349,110.006,110.006,110.006,4.418,0,8-3.582,8-8Z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="flex my-3 justify-between">
                <span class="">Organization</span>
                <div class="p-2">
                  <TextInput
                    :type="'text'"
                    :ref_for="true"
                    size="sm"
                    variant="subtle"
                    placeholder="Placeholder"
                    :disabled="false"
                    :modelValue="details.company"
                    v-model="details.company"
                  />
                </div>
              </div>

              <div class="flex my-3 justify-between">
                <span class="">Website</span>
                <div class="p-2">
                  <TextInput
                    :type="'text'"
                    :ref_for="true"
                    size="sm"
                    variant="subtle"
                    placeholder="Placeholder"
                    :disabled="false"
                    :modelValue="details?.website"
                    v-model="details.website"
                  />
                </div>
              </div>

              <div class="flex my-3 justify-between">
                <span class="">Territory</span>
                <div class="p-2 w-48">
                  <Autocomplete
                    :options="territory_list"
                    v-model="form_details.territory_id"
                    :modelValue="form_details.territory_id"
                    placeholder="Select industry"
                  />
                </div>
              </div>

              <div class="flex my-3 justify-between">
                <span class="">Industry</span>
                <div class="p-2 w-48">
                  <Autocomplete
                    :options="industry_list"
                    v-model="form_details.industry_id"
                    :modelValue="form_details.industry_id"
                    placeholder="Select industry"
                  />
                </div>
              </div>

              <div class="flex my-3 justify-between">
                <span class="">Job Title</span>
                <div class="p-2">
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
              </div>

              <div class="flex my-3 justify-between">
                <span class="">Source</span>
                <div class="p-2">
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
              </div>

              <div class="flex my-3 justify-between">
                <span class="">Lead Owner</span>
                <div class="p-2 w-48">
                  <Autocomplete
                    :options="user_list"
                    v-model="lead_owner"
                    :modelValue="lead_owner"
                    placeholder="Select lead owner"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex justify-between p-3">
              <div @click="person_tab = !person_tab" class="flex">
                <FeatherIcon
                  v-if="person_tab"
                  class="w-4 mx-3"
                  name="chevron-down"
                />
                <FeatherIcon v-else class="w-4 mx-3" name="chevron-right" />
                <span class="my-auto">Person</span>
              </div>
            </div>
            <div v-if="person_tab" class="px-6">
              <div class="flex my-3 justify-between">
                <span class="">Salutation</span>
                <div class="p-2">
                  <TextInput
                    :type="'text'"
                    :ref_for="true"
                    size="sm"
                    variant="subtle"
                    placeholder="Placeholder"
                    :disabled="false"
                    :modelValue="details.salutation"
                    v-model="details.salutation"
                  />
                </div>
              </div>

              <div class="flex my-3 justify-between">
                <span class="">First Name</span>
                <div class="p-2">
                  <TextInput
                    :type="'text'"
                    :ref_for="true"
                    size="sm"
                    variant="subtle"
                    placeholder="Placeholder"
                    :disabled="false"
                    :modelValue="details.first_name"
                    v-model="details.first_name"
                  />
                </div>
              </div>

              <div class="flex my-3 justify-between">
                <span class="">Last Name</span>
                <div class="p-2">
                  <TextInput
                    :type="'text'"
                    :ref_for="true"
                    size="sm"
                    variant="subtle"
                    placeholder="Placeholder"
                    :disabled="false"
                    :modelValue="details.last_name"
                    v-model="details.last_name"
                  />
                </div>
              </div>

              <div class="flex my-3 justify-between">
                <span class="">Email</span>
                <div class="p-2">
                  <TextInput
                    :type="'text'"
                    :ref_for="true"
                    size="sm"
                    variant="subtle"
                    placeholder="Placeholder"
                    :disabled="false"
                    :modelValue="details.email"
                    v-model="details.email"
                  />
                </div>
              </div>

              <div class="flex my-3 justify-between">
                <span class="">Mobile No</span>
                <div class="p-2">
                  <TextInput
                    :type="'text'"
                    :ref_for="true"
                    size="sm"
                    variant="subtle"
                    placeholder="Placeholder"
                    :disabled="false"
                    :modelValue="details.contact"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style  scoped>

</style>