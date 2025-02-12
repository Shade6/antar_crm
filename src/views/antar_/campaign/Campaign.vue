<script setup>
import Nav from "./nav/Nav.vue";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import {FeatherIcon} from "frappe-ui"
import CampaignTable from "./page/CampaignTable.vue"
import EmailTable from "./page/EmailTable.vue"
import WhatsappTable from "./page/WatsappTable.vue"
import Statistics from "./page/Statistics.vue"


const router = useRouter();
const currentHash = ref(router.currentRoute.value.hash); // Get the initial hash value

const tabs = ref([
  { id: "Email", label: "Email campaign" ,icon:"mail"},
  { id: "Whatsapp", label: "Whatsapp campaign" ,icon:"message-circle"},

  { id: "Statistics", label: "Statistics",icon:"slack" },
])

// Watch for changes in the hash value
watch(
  () => router.currentRoute.value.hash,
  (newHash) => {
    currentHash.value = newHash; // Update the currentHash ref when the hash changes
  }
);

// Set the initial hash value when the component is mounted
onMounted(() => {
  currentHash.value = router.currentRoute.value.hash;
});
</script>

<template>
  <Nav />

  <div class="px-4">
    <ul class="flex gap-5 text-center border-b border-gray-200 text-gray-500">
      <li v-for="tab in tabs" :key="tab.id">
         
        <a
          :href="`#${tab.id}`"
          class="flex   border-b-1 py-2 border-transparent hover:text-black hover:border-black transition-colors duration-200"
          :class="{
            'text-black ``': currentHash == `#${tab.id}`,
          }"
        >
         <FeatherIcon  class="w-5 h-5 my-auto mx-2" :name="tab.icon" />
         <span class="my-auto">{{ tab.label }}</span>
        
        </a>
      </li>
     
    </ul>
    <div class="my-3">
        <EmailTable v-if=" currentHash == '#Email'" />
        <WhatsappTable v-if=" currentHash == '#Whatsapp'"/>
        <!-- <CampaignTable v-if=" currentHash == '#Campaign'"/> -->
        <Statistics v-if=" currentHash == '#Statistics'"/>
    </div>

  </div>
</template>

<style scoped></style>