<script setup>
import { h, ref, watch } from "vue";
import ListIcon from "@/components/Icons/ListIcon.vue";
import CreateLead from "@/components/modal/CreateLead.vue";
import {
  Dropdown,
  FeatherIcon,
  Button,
  Breadcrumbs,
  Avatar,
  Dialog,
  Autocomplete,
} from "frappe-ui";
import { useSwitchStore } from "@/stores/switch";
import { findAllUsers,update_lead_assignee } from "@/api/userApi.js";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const props = defineProps({
  assignee: {
    type: Object,
    required: true,
  },
});
const users = ref([]);
const switchStore = useSwitchStore();
const dialog2 = ref(false);
const handle_create = () => {
  switchStore.changeCreateForm("create_lead");
};
const people = ref([]);

const fetch = async () => {
  people.value = props.assignee.map((val) => ({
    label: val?.user?.first_name + " " + val?.user?.last_name,
    value: val?.user?.user_id,
  }));
  const res = await findAllUsers();
  if (res.statusCode == 200) {
    users.value = res.data.map((val, i) => ({
      label: val.first_name + " " + val.last_name,
      value: val.user_id,
    }));
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
watch(
  () => dialog2.value,
  () => {
    fetch();
  }
);
const handle_update = async () => {
    const details_data = {
        lead_id :switchStore.create_form,
        users:people.value
    }
  const res = await update_lead_assignee(details_data);
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
      <Breadcrumbs
        :items="[
          {
            label: 'Leads',
            icon: '',
            route: '/components',
          },
          {
            label: 'Views',
            icon: '',
            route: '/components',
          },
        ]"
      >
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

    <div class="p-1 flex">
      <div v-for="data in props.assignee">
        <Button class="mx-1" @click="dialog2 = true">
          <Avatar
            style="cursor: pointer"
            :shape="'circle'"
            :ref_for="true"
            image=""
            :label="data?.user?.first_name"
            size="md"
          />
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
      <Button
        class="mx-2"
        :ref_for="true"
        theme="gray"
        size="sm"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
        @click="switchStore.changeCreateForm(null)"
      >
        close
      </Button>
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
