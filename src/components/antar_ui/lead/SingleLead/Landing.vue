<template>
  <div class="flex h-[675px]">
    <!-- Tabs Component -->
    <div class="flex-grow" :style="{ width: tabsWidth + '%' }">
      <Tabs class="w-full" v-model="state.index" :tabs="tabs">
        <template #tab-label="{ tab }">
          <div class="flex items-center gap-2">
            <!-- Render the icon -->
            <component :is="tab.icon" />
            <!-- Label -->
            <span>{{ tab.label }}</span>
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
        <span class="font-bold">{{ "CRM -" + details?.lead_id ?? "" }}</span>
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
      <div style="height: 80%; overflow-y: scroll">
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
                    <FeatherIcon class="w-4 mx-3" name="edit" />
                  </Button>
                </div>
              </div>
            </div>
            <div v-if="details_tab" class="px-6">
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
                <div class="p-2 w-52">
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
                <div class="p-2 w-52">
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
                <div class="p-2 w-52">
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

<script setup>
import { useSwitchStore } from "@/stores/switch";
import { ref, h, onMounted } from "vue";
import { Tabs, Button, FeatherIcon, TextInput, Autocomplete } from "frappe-ui";
import Activity from "@/components/antar_ui/lead/SingleLead/Activity.vue";
import Attachments from "@/components/antar_ui/lead/SingleLead/Attachments.vue";
import Calls from "@/components/antar_ui/lead/SingleLead/Calls.vue";
import Comments from "@/components/antar_ui/lead/SingleLead/Comments.vue";
import Notes from "@/components/antar_ui/lead/SingleLead/Notes.vue";
import Tasks from "@/components/antar_ui/lead/SingleLead/Tasks.vue";
import Emails from "@/components/antar_ui/lead/SingleLead/Emails.vue";
import {
  find_single_lead,
  find_assignees,
  find_all_industry,
  find_all_territories,
  findAllUsers,
  update_single_lead
} from "@/api/userApi.js";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const switchStore = useSwitchStore();
const tabsWidth = ref(70);
const sidebarWidth = ref(30);
const state = ref({index: null });
const details = ref({
  lead_id:null,
  company:null,
  website:null,
  lead_source:null,
  salutation:null,
  first_name:null,
  last_name:null,
  email:null,
  contact:null,
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

const fetch = async () => {
  const res = await find_single_lead(switchStore.create_form);
  if (res.statusCode == 200) {
    details.value.lead_id= res.data.lead_id
    details.value.company= res.data.company
    details.value.website= res.data.website
    details.value.lead_source= res.data.lead_source
    details.value.salutation= res.data.salutation
    details.value.first_name= res.data.first_name
    details.value.last_name= res.data.last_name
    details.value.email= res.data.email
    details.value.contact= res.data.contact


    if (res.data.industry) {
      form_details.value.industry_id = {
        label: res.data.industry.industry_name,
        value: res.data.industry.industry_id,
      };
    }
    if (res.data.territory) {
      form_details.value.territory_id = {
        label: res.data.territory.territory_name,
        value: res.data.territory.territory_id,
      };
    }
    if (res.data.assignee) {
      lead_owner.value = {
        label: res.data.assignee.first_name + " " + res.data.assignee.last_name,
        value: res.data.assignee.user_id,
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
  });

  if (res.statusCode === 200) {
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

<style>
body {
  font-family: "Inter", sans-serif;
}
</style>
