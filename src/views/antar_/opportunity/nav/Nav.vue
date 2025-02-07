<script setup>
import { h, ref, watch, defineEmits } from "vue";
import { useRouter } from "vue-router";
import ListIcon from "@/components/icons/ListIcon.vue";
import { Dropdown, FeatherIcon, Button, Breadcrumbs,Autocomplete } from "frappe-ui";
import {
  find_status_of_opportunity,
  update_opportunity_status,
} from "@/api/userApi.js";
const emit = defineEmits(["save"]);
const router = useRouter();
import { useSwitchStore } from "@/stores/switch";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const status = ref("")
const route_list = ref([
  {
    label: "Opportunities",
    icon: "",
    route: "/antar_/opportunities",
  },
]);

const switchStore = useSwitchStore();

const handle_create = () => {
  router.push("/antar_/opportunities/create");
};

const currentPath = router.currentRoute.value.path;
const isCreateRoute = () => {

  if (currentPath === "/antar_/opportunities/create") {
    route_list.value.push({ label: "New Opportunity", route: "/antar_/opportunities/create" });
  } else if (currentPath.includes("/antar_/opportunities/")) {
    const dealId = currentPath.split("/").pop();
    find_status(dealId)
    route_list.value.push({ label: `Opportunity ${dealId}`, route: currentPath });
  }
  return currentPath === "/antar_/opportunities/create";
};

const checkSingle=()=>{
    return currentPath.split("/").pop() 
}
const find_status =async(data)=>{
     const res = await find_status_of_opportunity(data)
     if(res.statusCode == 200){
        status.value = res.data
     }
}

watch(()=>status.value,async(data)=>{
  console.log(data.value,'=======')
  if(data.value){
    const res = await update_opportunity_status(currentPath.split("/").pop(),data.value)

  }
 
})


const handle_save = () => {
  emit("save");
};
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

      <Dropdown
        :options="[
          {
            group: '',
            items: [
              {
                label: 'List',
                icon: () => h(FeatherIcon, { name: 'menu' }),
                onClick: () => router.push('/antar_/opportunities'),
              },
              {
                label: 'Kanban',
                icon: () => h(FeatherIcon, { name: 'bar-chart-2' }),
                onClick: () => router.push('/antar_/opportunities/kanban'),
              }
           
            ],
          },
          
        ]"
      >
        <Button class="mx-2 hover:bg-gray-300 px-2 rounded-sm my-auto">
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

    <div class="p-1 flex">
      <div v-if="status">
      
        <div class="px-2">
          <Autocomplete
            :options="[
              { label: 'New', value: 'New', color: 'green' },
              { label: 'Contacted', value: 'Contacted', color: 'blue' },
              { label: 'Nurture', value: 'Nurture', color: 'yellow' },
              { label: 'Qualified', value: 'Qualified', color: 'green' },
              { label: 'UnQualified', value: 'UnQualified', color: 'red' },
              { label: 'Junk', value: 'Junk', color: 'orange' },
            ]"
            v-model="status"
            placeholder="status"
          >
            <template #prefix> </template>
            <template #item-prefix="{ option }">
              <span
                @click="handle_click_status"
                class="w-4 h-4 border rounded-full"
                :style="{ border: '4px solid ' + option.color }"
              ></span>
            </template>
          </Autocomplete>
        </div>
      </div>
      <Button
        v-if="!isCreateRoute()"
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
        create
      </Button>
      <Button
        v-else
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        size="sm"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
        @click="handle_save"
      >
        save
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
