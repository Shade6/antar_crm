<script setup>
import Nav from "./nav/Nav.vue";
import { ref, onMounted } from "vue";
import { FeatherIcon, Button, Tabs, ListView } from "frappe-ui";
import { contact_details_by_id } from "@/api/userApi.js"; // Import the function to get user by ID
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
import { useRoute, useRouter } from "vue-router"; // Import useRouter for navigation
import EditIcon from "@/components/icons/EditIcon.vue";
import Email2Icon from "@/components/icons/Email2Icon.vue";
import PinIcon from "@/components/icons/PinIcon.vue";

const route = useRoute(); // Use route to access route parameters
const router = useRouter(); // Initialize router for navigation
const contacts = ref({});
const opportunities = ref([]);

// Function to fetch contact by ID
const fetchContactById = async (id) => {
  try {
    const res = await contact_details_by_id(id);
    if(res.statusCode == 200){
      contacts.value = res.data.contact; // Set the fetched contact to the contacts ref
      opportunities.value = res.data.opportunities.map((item)=>{
        return {
          id: item.opportunity_id || 'not found',
          name: item.opportunity_name || 'not found',
          value: item.opportunity_value || 'not found',
          probability: item.probability || 'not found',
          status: item.status || 'not found',
          created_at: new Date(item.changed_on).toLocaleDateString() || 'not found',
        }
      });
    }else{
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
  } catch (error) {
    console.error("Error fetching contact:", error);
  }
};

// Use onMounted to call the function when the component is mounted
onMounted(() => {
  const contactId = route.params.id; // Get the ID from the route parameters
  fetchContactById(contactId);
});

const handle_edit = () => {
  const contactId = route.params.id; // Use the actual contact ID from the route
  router.push(`/antar_/contacts/edit#${contactId}`); // Navigate to the edit page with the correct ID
}
const handle_delete = async () => {
    const res = await delete_contact(route.params.id);
    if(res.statusCode == 200){
      router.push("/antar_/contacts");
    }else{
      toast.success(res.message, {
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });
    }
}
</script>

<template>
  <Nav></Nav>
  <div class="m-3" >
    <div class="flex">
      <div
        class="p-16 w-24 h-24 rounded-full bg-gray-200 flex justify-center items-center"
      >
        V
      </div>
      <div>
        <div class="mt-8 mx-4">
          <span class="text-gray-500 font-medium text-3xl my-1">
            MR vidhul prasad
          </span>
          <br />
          <div class="flex items-center">
            <span class="flex gap-2 my-auto">
              <Email2Icon icon="mail" class="w-4 h-4 my-auto" />
              www.vidhul@gmail.com
              <PinIcon icon="phone" class="w-4 h-4 my-auto" />
              more
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="p-1">
            <Button
              :variant="'subtle'"
              :ref_for="true"
              theme="gray"
              size="sm"
              label="Button"
              :loading="false"
              :loadingText="null"
              :disabled="false"
              :link="null"
              @click="handle_edit"
            >
              <div class="flex gap-2">
                <EditIcon icon="edit-3" class="w-4 h-4" />
                Edit
              </div>
            </Button>
          </div>
          <div class="p-1">
            <Button
              :variant="'subtle'"
              :ref_for="true"
              theme="red"
              size="sm"
              label="Button"
              :loading="false"
              :loadingText="null"
              :disabled="false"
              :link="null"
              @click="handle_delete"
            >
              <div class="flex gap-2">
                <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>

                Delete
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr />
  <div class="p-3">
    <h1 class="text-gray-700 font-medium text-xl my-1">Opportunities</h1>
  </div>
  <hr />
  <div>
    <ListView
      class="h-[250px] p-4"
      :columns="[
        {
          label: 'opportunities name',
          key: 'name',
      
        },
        {
          label: 'opportunities value',
          key: 'value',
       
        },
        {
          label: 'opportunities probability',
          key: 'probability',
        },
        {
          label: 'opportunities status',
          key: 'status',
        },
        {
          label: 'opportunities created at',
          key: 'created_at',
        },
      ]"
      :rows="opportunities"
      :options="{
        selectable: true,
        showTooltip: true,
        resizeColumn: true,
        emptyState: {
          title: 'No records found',
          description: 'Create a new record to get started',
          button: {
            label: 'New Record',
            variant: 'solid',
          },
        },
      }"
      row-key="id"
    >
      <template #cell="{ item, row, column }">
        <span class="font-medium text-ink-gray-7">
          {{ item }}
        </span>
      </template>
    </ListView>
  </div>
</template>

<style scoped></style>
