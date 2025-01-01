<script setup>
import { h, ref } from "vue";
import ListIcon from "@/components/Icons/ListIcon.vue";
import CreateLead from "@/components/modal/CreateLead.vue"
import CommonNav from "./secondNav/CommonNav.vue";
import { Dropdown, FeatherIcon } from "frappe-ui";
import { useSwitchStore } from "@/stores/switch";
const switchStore = useSwitchStore();
const dialog2 = ref(false);
</script>

<template>
  <div class="w-full px-6 py-3 border-b flex justify-between">
    <div class="w-1/2">
      <span class="text-gray-700 text-xl">{{ switchStore.page }} /</span>

      <Dropdown
        :options="[
          {
            group: '',
            items: [
              {
                label: 'List',
                icon: () => h(FeatherIcon, { name: 'menu' }),
              },
              {
                label: 'Kanban',
                icon: () => h(FeatherIcon, { name: 'bar-chart-2' }),
              },
              {
                label: 'Group By',
                icon: () => h(FeatherIcon, { name: 'align-center' }),
              },
            ],
          },
          {
            group: '',
            items: [
              {
                label: 'Create',
                icon: () => h(FeatherIcon, { name: 'pluse-circle' }),
              },
            ],
          },
        ]"
      >
        <Button class="mx-2 hover:bg-gray-300 px-2 rounded-sm">
          <div class="flex gap-2">
            <div class="my-auto">
              <ListIcon />
            </div>
            <div>
              <span class="">List</span>
            </div>
          </div>
        </Button>
      </Dropdown>
    </div>
     <CreateLead/>
    


  </div>
  <CommonNav
    v-if="switchStore.page != 'user' && switchStore.page != 'user-settings'"
  />
</template>

<style scoped></style>
