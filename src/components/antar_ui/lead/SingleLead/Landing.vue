<template>
  <div class="flex h-screen">
    <!-- Tabs Component -->
    <div class="flex-grow" :style="{ width: tabsWidth + '%' }">
      <Tabs class="w-full" v-model="state.index" :tabs="tabs">
        <template #tab-label="{ tab }">
          <div class="flex items-center gap-2">
            <i class="feather" :class="`feather-${tab.icon}`"></i>
            <span>{{ tab.label }}</span>
          </div>
        </template>

        <template #default="{ tab }">
          <div class="p-5">
            {{ tab.content }}
          </div>
        </template>
      </Tabs>
    </div>

    <!-- Resizable Handle (placed between the two divs) -->
    <div
      class="cursor-col-resize bg-gray-400 w-1 h-full"
      @mousedown="startResizing"
    ></div>

    <!-- Resizable Sidebar -->
    <div class="h-screen" :style="{ width: sidebarWidth + '%' }">
      <div class="p-2 border w-full">
        <span class="font-bold">CRM-LEAD-2024-00001</span>
      </div>
      <div class="p-2 border w-full flex">
        <img
          width="70"
          src="https://i.pinimg.com/736x/4a/ca/fe/4acafecd9b6e8bf88b2b80b971e338eb.jpg"
          alt=""
        />
        <div>
          <span class="my-auto text-3xl font-semibold">MR Vidhul prasad</span>
          <div class="flex">
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
              >
                <FeatherIcon name="phone" />
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
              >
              <FeatherIcon name="mail" />
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
              >
              <FeatherIcon name="link-2" />
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
              >
              <FeatherIcon name="paperclip" />
              </Button>
            </div>
          </div>
        </div>
      </div>


      <ul class="mt-12 flex flex-col">
      

      <li class="relative transition">
        <input class="peer hidden" type="checkbox" id="menu-2" />
        <div class="relative m-2 flex items-center border   py-3 pl-5 text-sm text-gray-500">
          <span class="mr-5 flex w-5 text-gray-500"
            ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg
          ></span>
          Analytics
          <label for="menu-2" class="absolute inset-0 h-full w-full cursor-pointer"></label>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="peer-checked:rotate-180 absolute right-0 top-6 mr-5 ml-auto h-4 text-gray-500 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <ul class="duration-400 peer-checked:max-h-96 m-2 flex max-h-0 flex-col overflow-hidden rounded-2xl  transition-all duration-300">
          <li class="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm  hover:bg-white">
            <span class="mr-5"
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg
            ></span>
            Carnival
          </li>
          <li class="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-white">
            <span class="mr-5"
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg
            ></span>
            Analytics
          </li>
          <li class="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-white">
            <span class="mr-5"
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg
            ></span>
            Revenue
          </li>
        </ul>
      </li>
      <li class="relative transition">
        <input class="peer hidden" type="checkbox" id="menu-3" />
        <div class="relative m-2 flex items-center border   py-3 pl-5 text-sm text-gray-500">
          <span class="mr-5 flex w-5 text-gray-500"
            ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg
          ></span>
          Analytics
          <label for="menu-3" class="absolute inset-0 h-full w-full cursor-pointer"></label>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="peer-checked:rotate-180 absolute right-0 top-6 mr-5 ml-auto h-4 text-gray-500 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <ul class="duration-400 peer-checked:max-h-96 m-2 flex max-h-0 flex-col overflow-hidden rounded-2xl  transition-all duration-300">
          <li class="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm  hover:bg-white">
            <span class="mr-5"
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg
            ></span>
            Carnival
          </li>
          <li class="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-white">
            <span class="mr-5"
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg
            ></span>
            Analytics
          </li>
          <li class="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-white">
            <span class="mr-5"
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg
            ></span>
            Revenue
          </li>
        </ul>
      </li>
    </ul>
    </div>
  </div>

  <div class="mt-5">
    <button @click="switchStore.changeCreateForm(null)">Close</button>
  </div>
</template>

<script setup>
import { useSwitchStore } from "@/stores/switch";
import { ref } from "vue";
import { Tabs ,Button,FeatherIcon} from "frappe-ui";

const switchStore = useSwitchStore();
const state = ref({
  index: null,
});

// Define tabs with icons and labels
const tabs = [
  {
    icon: "activity", // Icon for Activity tab
    label: "Activity",
    content:
      "Github is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.",
  },
  {
    icon: "mail", // Icon for Emails tab
    label: "Emails",
    content:
      "Twitter is an American microblogging and social networking service on which users post and interact with messages known as tweets.",
  },
  {
    icon: "message-circle", // Icon for Comments tab
    label: "Comments",
    content:
      "LinkedIn is an American business and employment-oriented online service that operates via websites and mobile apps.",
  },
  {
    icon: "phone-call", // Icon for Calls tab
    label: "Calls",
    content:
      "LinkedIn is an American business and employment-oriented online service that operates via websites and mobile apps.",
  },
  {
    icon: "check-square", // Icon for Tasks tab
    label: "Tasks",
    content:
      "LinkedIn is an American business and employment-oriented online service that operates via websites and mobile apps.",
  },
  {
    icon: "edit", // Icon for Notes tab
    label: "Notes",
    content:
      "LinkedIn is an American business and employment-oriented online service that operates via websites and mobile apps.",
  },
  {
    icon: "paperclip", // Icon for Attachments tab
    label: "Attachments",
    content:
      "LinkedIn is an American business and employment-oriented online service that operates via websites and mobile apps.",
  },
];

const tabsWidth = ref(70); // initial width for tabs section
const sidebarWidth = ref(30); // initial width for sidebar section

// Function to start resizing
function startResizing(event) {
  // Record the initial position of the mouse
  const initialX = event.clientX;
  const initialTabsWidth = tabsWidth.value;
  const initialSidebarWidth = sidebarWidth.value;

  // Set up the mousemove event to update the widths
  const onMouseMove = (moveEvent) => {
    const deltaX = moveEvent.clientX - initialX;
    if (deltaX < 117) {
      const newTabsWidth =
        initialTabsWidth + (deltaX / window.innerWidth) * 100; // Percentage
      const newSidebarWidth =
        initialSidebarWidth - (deltaX / window.innerWidth) * 100;
      console.log(newTabsWidth, "dddddddd", newSidebarWidth, "ddddd", deltaX);
      // Set the new widths, ensuring they are within bounds
      if (newTabsWidth >= 60 && newTabsWidth <= 100) {
        tabsWidth.value = newTabsWidth;
        sidebarWidth.value = newSidebarWidth;
      }
    }
  };

  // Stop resizing when mouseup occurs
  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}
</script>

<style scoped>
.feather {
  width: 16px;
  height: 16px;
}

.cursor-col-resize {
  cursor: col-resize;
  background-color: #aaa;
}
</style>
