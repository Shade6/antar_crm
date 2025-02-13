<script setup>
import { h, ref, watch, defineEmits, onUnmounted,onMounted } from "vue";
import { useRouter } from "vue-router";
import ListIcon from "@/components/icons/ListIcon.vue";
import { Dropdown, FeatherIcon, Button, Breadcrumbs } from "frappe-ui";

const emit = defineEmits(["refresh","create_email_campaign","create_whatsapp_campaign"]);
const router = useRouter();
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const route_list = ref([
  {
    label: "Campaign",
    icon: "",
    route: "/antar_/campaign",
  },
]);
const handle_create_page = () => {
  if (router?.currentRoute?.value?.hash == "#Email") {
    router.push("/antar_/campaign/create-email-campaign");
  }
  if (router?.currentRoute?.value?.hash == "#Whatsapp") {
    router.push("/antar_/campaign/create-whatsapp-campaign");
  }
};
onMounted(() => {

if (router.currentRoute.value.fullPath == "/antar_/campaign/create-email-campaign") {
  route_list.value = [
    {
      label: "Campaign",
      icon: "",
      route: "/antar_/campaign",
    },
    {
      label: "Create New Email Campaign",
      icon: "",
    },
  ];
} else if (router.currentRoute.value.path == "/antar_/campaign/create-whatsapp-campaign") {
    route_list.value = [
    {
      label: "Campaign",
      icon: "",
      route: "/antar_/campaign",
    },
    {
      label: "Create New Whatsapp Campaign",
      icon: "",
    },
  ];
} 
});
const handle_create_email_campaign = ()=>{
   emit("create_email_campaign")
}
const handle_create_whatsapp_campaign = ()=>{
   emit("create_whatsapp_campaign")
}
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

    <div class="px-1 flex">
      <div class="px-1">
        <Button
          v-if="router.currentRoute.value.hash"
          :variant="'solid'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
          @click="handle_create_page()"
        >
          Create
          {{ router?.currentRoute?.value?.hash.replace("#", "") }} Campaign
        </Button>
      </div>

      <div class="px-1">
    
        <Button
          v-if="router.currentRoute.value.name == 'create-email-campaign'"
        class="mx-3"
          :variant="'subtle'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
        >
        Preview & Test
        </Button>

        <Button
          v-if="router.currentRoute.value.name == 'create-email-campaign'"
          :variant="'solid'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
          @click="handle_create_email_campaign()"
        >
          Schedule Campaign
        </Button>
        <Button
          v-if="router.currentRoute.value.name == 'create-whatsapp-campaign'"
        class="mx-3"
          :variant="'subtle'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
        >
          Preview & Test
        </Button>
        <Button
          v-if="router.currentRoute.value.name == 'create-whatsapp-campaign'"
          :variant="'solid'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
          @click="handle_create_whatsapp_campaign()"
        >
          Save Whatsapp Campaign
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
