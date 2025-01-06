<script setup>
import { h, ref } from "vue";
import ListIcon from "@/components/Icons/ListIcon.vue";
import CreateLead from "@/components/modal/CreateLead.vue"
import CommonNav from "./secondNav/CommonNav.vue";
import { Dropdown, FeatherIcon ,Button} from "frappe-ui";
import { useSwitchStore } from "@/stores/switch";
const switchStore = useSwitchStore();
const dialog2 = ref(false);
const handle_create = ()=>{
  switchStore.changeCreateForm('create_lead')
}
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
    <div class="p-1">
      <Button
        v-if="switchStore.create_form == null"
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        size="sm"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
        @click="handle_create"
      >
      <span class="text-bold">+</span>
        Create
      </Button>
    </div>
  </div>
  
</template>

<style scoped></style>
