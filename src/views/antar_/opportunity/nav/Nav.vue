<script setup>
import { h, ref, watch, defineEmits ,onMounted} from "vue";
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

const checkSingle=()=>{
    return currentPath.split("/").pop() 
}
const find_status =async(data)=>{
     const res = await find_status_of_opportunity(data)
     if (res.statusCode == 200) {
      const foundStatus = [
        { label: "New", value: "New", color: "green" },
        { label: "Contacted", value: "Contacted", color: "blue" },
        { label: "Nurture", value: "Nurture", color: "yellow" },
        { label: "Qualified", value: "Qualified", color: "green" },
        { label: "UnQualified", value: "UnQualified", color: "red" },
        { label: "Junk", value: "Junk", color: "orange" },
      ].find((item) => item.value === res.data);

      if (foundStatus) {
        status.value = foundStatus;
      }
    }
}

onMounted(() => {

  if (router.currentRoute.value.fullPath == "/antar_/opportunities/create") {
    route_list.value = [
      {
        label: "Opportunities",
        icon: "",
        route: "/antar_/opportunities",
      },
      {
        label: "Create New Opportunities",
        icon: "",
      },
    ];
  } else if (router.currentRoute.value.path == "/antar_/opportunities") {
    route_list.value = [
      {
        label: "Opportunities",
        icon: "",
        route: "/antar_/opportunities",
      },
    ];
  } else if (router.currentRoute.value.params?.id) {
    find_status(router.currentRoute.value.params?.id)
    route_list.value = [
      {
        label: "Opportunities",
        icon: "",
        route: "/antar_/opportunities",
      },
      {
        label: `single Opportunities ${router.currentRoute.value.params?.id}`,
        icon: "",
      },
    ];
  } else if (router.currentRoute.value.path == "/antar_/leads/kanban") {
    route_list.value = [
      {
        label: "Opportunities",
        icon: "",
        route: "/antar_/opportunities",
      },
      {
        label: "kanban view",
        icon: "",
      },
    ];
  }
});


const handle_save = () => {
  emit("save");
};
const handleSelect = async (value) => {
  console.log("Selected:", value.value);
  const res = await update_opportunity_status(
    router.currentRoute.value.params?.id,
    value.value
  );
  if (res.statusCode == 200) {
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
      class="my-auto"
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
      <div v-if="router.currentRoute?.value?.params?.id">
      
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
             @update:modelValue="handleSelect"
          >
            <template #prefix> 

              <span
                @click="handle_click_status"
                class="w-4 h-4 border rounded-full mr-2"
                :style="{ border: '4px solid ' + status.color }"
              ></span>
            </template>
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
      v-if="router.currentRoute.value.path == '/antar_/opportunities' || router.currentRoute?.value?.params?.id"
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
        v-if="router.currentRoute.value.path == '/antar_/opportunities/create'"
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
