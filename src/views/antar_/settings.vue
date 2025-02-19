<script setup>
import { ref } from "vue";
import TerritoryList from "@/components/antar_ui/settings/TerritoryList.vue";
import IndustryList from "@/components/antar_ui/settings/IndustryList.vue";
import Settings from "@/components/antar_ui/settings/Settings.vue";
import Subscription from "@/components/antar_ui/settings/Subscription.vue";
import Email from "@/components/antar_ui/settings/email/Email.vue";
import ScoringRules from "@/components/antar_ui/settings/ScoringRules.vue";
import CampaignEmail from "@/components/antar_ui/settings/CampaignEmail.vue";
import Ai from "@/components/antar_ui/settings/Ai.vue";

const page = ref(null);

const handle_back = () => {
  page.value = null;
};
</script>

<template>
  <div v-if="page == null" class="p-10">
    <div class="my-4">
      <span class="text-3xl font-semibold">CRM</span>
    </div>
    <div class="my-2">
      <span class="text-2xl">Meta Data</span>
    </div>
    <div class="flex gap-5">
      <div
        @click="page = 'territory_list'"
        class="p-5 rounded-sm shadow-lg w-64 flex justify-between"
        style="cursor: pointer"
      >
        <span>Territory</span>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-up-right"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
      <div
        @click="page = 'industry_list'"
        class="p-5 rounded-sm shadow-lg w-64 flex justify-between"
        style="cursor: pointer"
      >
        <span>Industry</span>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-up-right"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
      <div
        @click="page = 'scoring_rules'"
        style="cursor: pointer"
        class="p-5 rounded-sm shadow-lg w-64 flex justify-between"
      >
        <span>Scoring Rules</span>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-up-right"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
    </div>

    <div class="mb-2 mt-10">
      <span class="text-2xl">Settings</span>
    </div>
    <div class="flex gap-5">
      <div
        style="cursor: pointer"
        class="p-5 rounded-sm shadow-lg w-64 flex justify-between"
        @click="page = 'settings'"
      >
        <span>Account Settings</span>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-up-right"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
      <div
        @click="page = 'subscription'"
        style="cursor: pointer"
        class="p-5 rounded-sm shadow-lg w-64 flex justify-between"
      >
        <span>Subscription</span>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-up-right"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
      <div
        @click="page = 'email'"
        style="cursor: pointer"
        class="p-5 rounded-sm shadow-lg w-64 flex justify-between"
      >
        <span>Email</span>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-up-right"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
    </div>
    <div class="mb-2 mt-10">
      <span class="text-2xl">Campaign</span>
    </div>
    <div class="flex gap-5">
      <div
        style="cursor: pointer"
        class="p-5 rounded-sm shadow-lg w-64 flex justify-between"
        @click="page = 'campaign_email'"
      >
        <span>Campaign Email</span>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-up-right"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
      
      
    </div>
    <div class="mb-2 mt-10">
      <span class="text-2xl">AI</span>
    </div>
    <div class="flex gap-5">
      <div
        style="cursor: pointer"
        class="p-5 rounded-sm shadow-lg w-64 flex justify-between"
        @click="page = 'ai'"
      >
        <span>Manage AI</span>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-up-right"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
      
      
    </div>
  </div>

  <div v-else-if="page == 'territory_list'">
    <TerritoryList @go_back="handle_back" />
  </div>
  <div v-else-if="page == 'industry_list'">
    <IndustryList @go_back="handle_back" />
  </div>
  <div v-else-if="page == 'settings'">
    <Settings @go_back="handle_back" />
  </div>
  <div v-else-if="page == 'subscription'">
    <Subscription @go_back="handle_back" />
  </div>
  <div v-else-if="page == 'email'">
    <Email @go_back="handle_back" />
  </div>
  <div v-else-if="page == 'scoring_rules'">
    <ScoringRules @go_back="handle_back" />
  </div>
  <div v-else-if="page == 'campaign_email'">
      <CampaignEmail/>
  </div>
  <div v-else-if="page == 'ai'">
      <Ai/>
  </div>
</template>

<style scoped></style>
