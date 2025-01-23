<script setup>
import { h, ref, watch, defineEmits } from "vue";
import { useRouter } from "vue-router";
import ListIcon from "@/components/icons/ListIcon.vue";
import { Dropdown, FeatherIcon, Button, Breadcrumbs } from "frappe-ui";

const emit = defineEmits(["save"]);
const router = useRouter();
import { useSwitchStore } from "@/stores/switch";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
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

const isCreateRoute = () => {
  const currentPath = router.currentRoute.value.path;
  if (currentPath === "/antar_/opportunities/create") {
    route_list.value.push({ label: "New Opportunity", route: "/antar_/opportunities/create" });
  } else if (currentPath.includes("/antar_/opportunities/")) {
    const dealId = currentPath.split("/").pop();
    route_list.value.push({ label: `Opportunity ${dealId}`, route: currentPath });
  }
  return currentPath === "/antar_/opportunities/create";
};

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
              },
              {
                label: 'Kanban',
                icon: () => h(FeatherIcon, { name: 'bar-chart-2' }),
                onClick: () => router.push('/antar_/opportunities/kanban'),
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
