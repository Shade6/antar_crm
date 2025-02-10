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

const emit = defineEmits(["save", "update"]);
const router = useRouter();
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const route_list = ref([
  {
    label: "Products-Services",
    icon: "",
    route: "/antar_/product-services",
  },
]);

const isCreateRoute = () => {
  return router.currentRoute.value.path === "/antar_/product-services/create";
};

const isEditRoute = () => {
  return router.currentRoute.value.path.includes("/antar_/product-services/edit");
};

const isSingleViewRoute = () => {
  return router.currentRoute.value.path.includes("/antar_/product-services/");
};

if (isCreateRoute()) {
  route_list.value.push({
    label: "New Product/service",
    route: "/antar_/product-services/create",
  });
} else if (isEditRoute()) {
  const orgId = router.currentRoute.value.path.split("/").pop();
  route_list.value.push({
    label: `Product Edit ${orgId}`,
    route: router.currentRoute.value.path,
  });
} else if (isSingleViewRoute()) {
  const orgId = router.currentRoute.value.path.split("/").pop();
  route_list.value.push({
    label: `Product ${orgId}`,
    route: router.currentRoute.value.path,
  });
}

const handle_create = () => {
    router.push("/antar_/product-services/create");
};

const handle_save = () => {
    emit("save");
};

const handle_update = () => {
    emit("update");
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
       class="my-auto"
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
                onClick: () => router.push('/antar_/deals/kanban')
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
        v-if="!isCreateRoute() && !isEditRoute()"
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
        v-else-if="isEditRoute()"
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        size="sm"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
        @click="handle_update"
      >
        <span class="text-bold">+</span>
        Update
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
        <span class="text-bold">+</span>
        Save
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
