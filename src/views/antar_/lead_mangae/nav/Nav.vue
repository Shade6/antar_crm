<script setup>
import { h, ref, watch, defineEmits, onMounted } from "vue";
import { useRouter } from "vue-router";
import ListIcon from "@/components/icons/ListIcon.vue";
import {
  Dropdown,
  FeatherIcon,
  Button,
  Breadcrumbs,
  Autocomplete,
  Dialog,
} from "frappe-ui";
import {
  find_status_of_opportunity,
  update_lead_status,
  find_single_lead,
  find_assignees,
  find_status_of_lead,
  findAllUsers,
  remove_lead_assignee,
} from "@/api/userApi.js";
const emit = defineEmits(["save"]);
const router = useRouter();
import { useSwitchStore } from "@/stores/switch";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const status = ref("");
const people = ref([]);
const users = ref([]);
const leader_ = ref("");
const route_list = ref([
  //   {
  //     label: "Leads",
  //     icon: "",
  //     route: "/antar_/leads",
  //   },
]);

const assignees = ref([]);
const dialog2 = ref(false);
const handle_create = () => {
  router.push("/antar_/leads/create");
};

const currentPath = router.currentRoute.value.path;

const isCreateRoute = () => {
  //   if (currentPath === "/antar_/leads/create") {
  //     route_list.value.push({ label: "New Lead", route: "/antar_/leads/create" });
  //   } else if (currentPath.includes("/antar_/leads/")) {
  //     const dealId = currentPath.split("/").pop();
  //     route_list.value=[
  //   ...route_list.value,
  //   {
  //     label: "Leads",
  //     icon: "",
  //     route: "/antar_/leads/dddd",
  //   },
  // ]
  //   }
  //   return currentPath === "/antar_/leads/create";
};

const find_assignees_func = async () => {
  if (router.currentRoute.value.params?.id) {
    const res = await find_assignees(router.currentRoute.value.params?.id);
    if (res.statusCode == 200) {
      assignees.value = res.data;
      people.value = res.data.map((val) => ({
        label: val.user.first_name + " " + val.user.last_name,
        value: val.user.user_id,
      }));
      leader_.value = res.leader;
    }
  }
};

const handle_save = () => {
  emit("save");
};
const handle = () => {
  console.log(router.currentRoute.value.params);
};

const handle_data = async () => {
  if (router.currentRoute.value.params?.id) {
    const res_status = await find_status_of_lead(
      router.currentRoute.value.params?.id
    );
    if (res_status.statusCode == 200) {
      const foundStatus = [
        { label: "New", value: "New", color: "green" },
        { label: "Contacted", value: "Contacted", color: "blue" },
        { label: "Nurture", value: "Nurture", color: "yellow" },
        { label: "Qualified", value: "Qualified", color: "green" },
        { label: "UnQualified", value: "UnQualified", color: "red" },
        { label: "Junk", value: "Junk", color: "orange" },
      ].find((item) => item.value === res_status.data);

      if (foundStatus) {
        status.value = foundStatus;
      }
    }
  }
};

const handleSelect = async (value) => {
  console.log("Selected:", value.value);
  const res = await update_lead_status(
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

const handle_remove = async (id) => {
  const res = await remove_lead_assignee({
    lead_id: router.currentRoute.value.params?.id,
    id: id,
  });
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
    reloadStore.set_assignee_reload();
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

onMounted(() => {
  handle_data();
  find_assignees_func();
  if (router.currentRoute.value.fullPath == "/antar_/leads/create") {
    route_list.value = [
      {
        label: "Leads",
        icon: "",
        route: "/antar_/leads",
      },
      {
        label: "Create New Lead",
        icon: "",
      },
    ];
  } else if (router.currentRoute.value.path == "/antar_/leads") {
    route_list.value = [
      {
        label: "Leads",
        icon: "",
        route: "/antar_/leads",
      },
    ];
  } else if (router.currentRoute.value.params?.id) {
    route_list.value = [
      {
        label: "Leads",
        icon: "",
        route: "/antar_/leads",
      },
      {
        label: `single lead ${router.currentRoute.value.params?.id}`,
        icon: "",
      },
    ];
  } else if (router.currentRoute.value.path == "/antar_/leads/kanban") {
    route_list.value = [
      {
        label: "Leads",
        icon: "",
        route: "/antar_/leads",
      },
      {
        label: "kanban view",
        icon: "",
      },
    ];
  }else if (router.currentRoute.value.path == '/antar_/leads/convert-lead'){
    route_list.value = [
      {
        label: "Leads",
        icon: "",
        route: "/antar_/leads",
      },
      {
        label: "Convert Lead To Opportunity",
        icon: "",
      },
    ];
  }
});

watch(
  () => dialog2.value,
  async () => {
    const res = await findAllUsers();
    if (res.statusCode == 200) {
      users.value = res.data.map((val, i) => ({
        label: val.first_name + " " + val.last_name,
        value: val.user_id,
      }));
    } else {
      toast.success(res.message, {
        position: "top-left",
        duration: 3000,
        dismissible: true,
      });
    }
  }
);

const handle_convert_lead = ()=>{
    router.push(`/antar_/leads/convert-lead#${router.currentRoute.value.params?.id}`);
}
</script>

<template>
<!-- {{ router.currentRoute.value.hash }} -->
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
                onClick: () => router.push('/antar_/leads'),
              },
              {
                label: 'Kanban',
                icon: () => h(FeatherIcon, { name: 'bar-chart-2' }),
                onClick: () => router.push('/antar_/leads/kanban'),
              },
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
      <div v-for="data in assignees">
        <Button class="mx-1" @click="dialog2 = true">
          <span class="uppercase rounded-full border-b">
            {{ data.user.first_name[0] }}
          </span>
        </Button>
        <Dialog v-model="dialog2">
          <template #body-title>
            <h3>Assign To</h3>
          </template>
          <template #body-content>
            <div>
              <div class="p-2">
                <Autocomplete
                  :options="users"
                  v-model="people"
                  placeholder="Select people"
                  :multiple="true"
                />
              </div>
              <div class="w-full flex flex-wrap my-4">
                <div
                  class="px-2 bg-gray-50 m-2 rounded-sm"
                  v-for="peop in people"
                >
                  <div class="">
                    <span class="my-auto"> {{ peop?.label }}</span>
                    <Button
                      v-if="leader_ !== peop?.value"
                      class="my-auto"
                      :variant="'ghost'"
                      :ref_for="true"
                      theme="gray"
                      size="sm"
                      label="Button"
                      :loading="false"
                      :loadingText="null"
                      :disabled="false"
                      :link="null"
                      @click="handle_remove(peop?.value)"
                    >
                      <FeatherIcon class="w-4" name="x" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #actions>
            <Button @click="handle_update" variant="solid"> updated </Button>
            <Button class="ml-2" @click="dialog2 = false"> Close </Button>
          </template>
        </Dialog>
      </div>
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
        class="mx-2"
        v-if="router.currentRoute?.value?.params?.id"
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        size="sm"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
        @click="handle_convert_lead"
      >
        Convert to Opportunity
      </Button>
      <Button
        v-if="router.currentRoute.value.path == '/antar_/leads/convert-lead'"
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
        Save & Convert
      </Button>

      <Button
        v-if="router.currentRoute.value.path == '/antar_/leads' || router.currentRoute?.value?.params?.id"
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
        v-if="router.currentRoute.value.path == '/antar_/leads/create'"
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
