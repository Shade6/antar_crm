<script setup>
import { h, ref, watch, defineEmits } from "vue";
import { useRouter } from "vue-router";
import ListIcon from "@/components/icons/ListIcon.vue";
import {
  Dropdown,
  FeatherIcon,
  Button,
  Breadcrumbs,
} from "frappe-ui";

const router = useRouter();
const emit = defineEmits(["save"]);
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const route_list = ref([
  {
    label: "Contacts",
    icon: "",
    route: "/antar_/contacts",
  },
]);

const isCreateRoute = () => {
  return router.currentRoute.value.path === "/antar_/contacts/create";
};

const isDetailRoute = () => {
  return router.currentRoute.value.params.id !== undefined;
};

if (isCreateRoute()) {
  route_list.value.push({
    label: "New Contact",
    route: "/antar_/contacts/create",
  });
} else if (isDetailRoute()) {
  const contactId = router.currentRoute.value.params.id;
  route_list.value.push({
    label: `Contact ${contactId}`,
    route: router.currentRoute.value.path,
  });
}

const handle_create = () => {
    router.push("/antar_/contacts/create");
};

const handle_save = () => {
    emit("save");
};

const handle_view = () => {
    router.push("/antar_/contacts/kanban");
};

</script>

<template>
  <div class="w-full px-6 py-3 border-b flex justify-between">
    <div class="w-1/2 flex">
      <Breadcrumbs
        :items="route_list"
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
                onClick: handle_view
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
        <span class="text-bold">+</span>
        Create
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
        Save
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
