<script setup>
import { h, ref, watch, defineEmits, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import ListIcon from "@/components/icons/ListIcon.vue";
import {
  Dropdown,
  FeatherIcon,
  Button,
  Breadcrumbs,
} from "frappe-ui";

const emit = defineEmits(["refresh"]);
const router = useRouter();
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const route_list = ref([
  {
    label: "notes",
    icon: "",
    route: "/antar_/notes",
  },
]);


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
    </div>

    <div class="p-1 flex">
        <div class="p-1">
            <Button
                :variant="'solid'"
                :ref_for="true"
                theme="gray"
                size="sm"
                label="Button"
                :loading="false"
                :loadingText="null"
                :disabled="false"
                :link="null"
            >
                Create Note
            </Button>
            </div>
    </div>
  </div>
</template>

<style scoped></style>