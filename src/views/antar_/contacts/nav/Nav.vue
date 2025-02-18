<script setup>
import { h, ref, watch, defineEmits, onMounted } from "vue";
import { useRouter } from "vue-router";
import ListIcon from "@/components/icons/ListIcon.vue";
import {
  Dropdown,
  FeatherIcon,
  Button,
  Breadcrumbs,
} from "frappe-ui";

const router = useRouter();
const emit = defineEmits(["save", "update"]);
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const route_list = ref([]);

onMounted(() => {
  if (router.currentRoute.value.fullPath == "/antar_/contacts/create") {
    route_list.value = [
      {
        label: "Contacts",
        icon: "",
        route: "/antar_/contacts",
      },
      {
        label: "New Contact",
        icon: "",
      },
    ];
  } else if (router.currentRoute.value.path == "/antar_/contacts") {
    route_list.value = [
      {
        label: "Contacts",
        icon: "",
        route: "/antar_/contacts",
      },
    ];
  } else if (router.currentRoute.value.params?.id) {
    route_list.value = [
      {
        label: "Contacts",
        icon: "",
        route: "/antar_/contacts",
      },
      {
        label: `Contact ${router.currentRoute.value.params?.id}`,
        icon: "",
      },
    ];
  } else if (router.currentRoute.value.path == "/antar_/contacts/kanban") {
    route_list.value = [
      {
        label: "Contacts",
        icon: "",
        route: "/antar_/contacts",
      },
      {
        label: "Kanban View",
        icon: "",
      },
    ];
  } else if (router.currentRoute.value.path == "/antar_/contacts/convert_contact") {
    route_list.value = [
      {
        label: "Contacts",
        icon: "",
        route: "/antar_/contacts",
      },
      {
        label: "Convert Contact",
        icon: "",
      },
    ];
  }else if (router.currentRoute.value.path == "/antar_/contacts/edit") {
    route_list.value = [
      {
        label: "Contacts",
        icon: "",
        route: "/antar_/contacts",
      },
      {
        label: "Edit Contact",
        icon: "",
      },
    ];
  }
});

const handle_create = () => {
  router.push("/antar_/contacts/create");
};

const handle_save = () => {
  emit("save");
};

const handle_view = () => {
  router.push("/antar_/contacts/kanban");
};

const handle_update = () => {
  emit("update");
};

const converter = () => {
  const contactId = router.currentRoute.value.params.id;
  router.push(`/antar_/contacts/convert_contact#${contactId}`);
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
    </div>

    <div class="p-1 flex">
 
      <Button
        v-if="router.currentRoute.value.path == '/antar_/contacts/edit'"
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
        Update
      </Button>
      <Button
        v-if="router.currentRoute.value.path == '/antar_/contacts'"
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
       v-if="router.currentRoute.value.path == '/antar_/contacts/create'"
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
      <Button
      v-if="router.currentRoute?.value?.params?.id"
        class="mx-3"
        :variant="'solid'"
        :ref_for="true"
        theme="gray"
        size="sm"
        label="Button"
        :loading="false"
        :loadingText="null"
        :disabled="false"
        :link="null"
        @click="converter"
      >
        Convert to Lead
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
