<script setup>
import Nav from "./nav/Nav.vue";
import { ref, onMounted } from "vue";
import { FeatherIcon, Button, Tabs, ListView } from "frappe-ui";

import { get_single_organization,delete_organization ,find_pdf , fetch_org_estimate} from "@/api/userApi.js"; // Import the API function
import { useRoute, useRouter } from "vue-router"; // Import useRoute to access route parameters
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import EditIcon from "@/components/icons/EditIcon.vue";
import AppsIcon from "@/components/icons/AppsIcon.vue";
const toast = useToast();

const tab = ref(0);
const route = useRoute(); // Get the current route
const router = useRouter(); // Get the current route
const organizationId = route.params.id; // Extract the organization ID from the route parameters

const state = ref({
  index: 0, // Initialize index to 0 for the first tab
  organization: null, // Initialize organization as null
  deals: [], // Initialize deals as an empty array
  opportunities: [], // Initialize contacts as an empty array
});

const opportunities_list = ref([]);
const contacts_list = ref([]);
const estimate_list = ref([])
// Fetch organization data on mount
const fetchOrganizationData = async () => {
  const res = await get_single_organization(organizationId); // Fetch organization data using the ID
  if (res.statusCode === 200) {
    state.value.organization = res.data.organization; // Store the organization data
    state.value.opportunities = res.data.opportunities;
    opportunities_list.value = res.data.opportunities.map((val) => ({
      id: val.opportunity_id,
      opportunity_name: val.opportunity_name || "not set",
      opportunity_value: val.opportunity_value || "not set",
      probability: val.probability || "not set",
      status: val.status || "not set",
      created_at: new Date(val.changed_on).toLocaleDateString() || "not set",
      pdf:val.pdf || null,
    }));
    contacts_list.value = res.data.contact.map((val)=>({
      id:val.contact_id,
      contact_name:val.first_name+" "+val.last_name,
      contact_email:val.email_id,
      contact_phone:val.phone,
      created_on:  val.create_on ?new Date(val.create_on).toLocaleDateString : 'no date'
    }))


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

const fetch_estimate_=async()=>{
  const res = await fetch_org_estimate(organizationId)
  if(res.statusCode == 200){
    estimate_list.value = res.data.map((val)=>({
      id:val.estimate_id,
      estimate_number:val.estimate_number,
      organization_name:val.organization.organization_name,
      grand_total:val.grand_total,
      issue_date:new Date(val.issue_date).toLocaleDateString(),
      created_at:new Date(val.created_at).toLocaleDateString()
    }))
  }
}


onMounted(() => {
  fetch_estimate_()
  fetchOrganizationData(); // Call the fetch function to get organization data
});

const handle_delete_organization = async () => {
  const res = await delete_organization([organizationId]);
  if (res.statusCode === 200) {
    
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
    router.push("/antar_/organizations");
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
};
// Example data for testing (optional)
state.value.deals = [
  { id: 1, name: "Deal 1", amount: "$500", status: "Closed" },
  { id: 2, name: "Deal 2", amount: "$1000", status: "Pending" },
];
state.value.contacts = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

const handle_item = async(data)=>{
  router.push(`/antar_/estimate/create#${data}`);
//   const res = await create_estimate({opportunity_id:data})
// if(res.statusCode == 200){
//   toast.success(res.message, {
//       position: "top-right",
//       duration: 3000,
//       dismissible: true,
//       style: {
//         background: "white",
//         color: "black",
//         padding: "4px 20px",
//         borderRadius: "8px",
//         fontSize: "16px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//         borderLeft: "5px solid green",
//       },
//     });
//     fetchOrganizationData()
// }else{
//   toast.success(res.message, {
//       position: "top-right",
//       duration: 3000,
//       dismissible: true,
//       style: {
//         background: "#FFF5F5",
//         color: "black",
//         padding: "4px 20px",
//         borderRadius: "8px",
//         fontSize: "16px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//         borderLeft: "5px solid red",
//       },
//     });
// }

}
const view_estimate = async(data)=>{
  const res = await find_pdf(data)
  if(res.statusCode == 200){
    window.open(res.data, "_blank");
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
}

const handle_opportunity_view = (data)=>{
  router.push(`/antar_/opportunities/${data}`);
}
const handle_contact_view = (data)=>{
  router.push(`/antar_/contacts/${data}`);
}

</script>

<template>
  <Nav></Nav>
 
  <div class="m-3">
    <div class="flex">
      <img class="rounded-full mx-3" v-if="state?.organization?.image" width="150px" height="150px" :src="state?.organization?.image" alt="">
      <div
      v-else
        class="p-16 w-24 h-24 rounded-full bg-gray-200 flex justify-center items-center"
      >
      {{ state?.organization?.organization_name[0] }}
      
      
      </div>
      <div>
        <div class="mt-8 mx-4">
          <span class="text-gray-500 font-medium text-3xl my-1">
            {{ state?.organization?.organization_name }}
          </span>
          <br />
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
              @click="router.push(`/antar_/organizations/edit/${organizationId}`)"
            >
              <div class="flex gap-2">
                <EditIcon icon="pencil" class="w-4 h-4" />
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
              @click="handle_delete_organization"
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
  <div class="p-4">
    <div class="border-b border-gray-200 dark:border-neutral-700">
      <nav
        class="flex gap-x-1"
        aria-label="Tabs"
        role="tablist"
        aria-orientation="horizontal"
      >
        <button
          type="button"
          class="hs-tab-active:border-black py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-xl whitespace-nowrap   focus:outline-none  disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 active"
          :class="{ 'text-black border-black': tab === 0, 'text-gray-500': tab !== 0 }"
          @click="tab = 0"
        >
      
          <FeatherIcon name="key" class="w-4"/>
          Opportunities
          <span
            class="text-white font-medium text-sm bg-black px-1 py-0 rounded-full"
            >{{ state.opportunities.length }}</span
          >
        </button>
        <button
          type="button"
          class="hs-tab-active:font-semibold hs-tab-active:border-black hs-tab-active:text-black py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-xl whitespace-nowrap text-gray-500 hover:text-black focus:outline-none focus:text-black disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
          @click="tab = 1"
        >
        <FeatherIcon name="user-check" class="w-4"/>
          Contacts
          <span
            class="text-white font-medium text-sm bg-black px-1 py-0 rounded-full"
            >{{ contacts_list.length }}</span
          >
        </button>
        <button
          type="button"
          class="hs-tab-active:font-semibold hs-tab-active:border-black hs-tab-active:text-black py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-xl whitespace-nowrap text-gray-500 hover:text-black focus:outline-none focus:text-black disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
          @click="tab = 3"
        >
        
          <FeatherIcon name="bar-chart-2" class="w-4"/>
          Estimates
          <span
            class="text-white font-medium text-sm bg-black px-1 py-0 rounded-full"
            >{{ estimate_list.length }}</span
          >
        </button>
      </nav>
    </div>

    <div class="mt-3">
      <div
        id="tabs-with-icons-1"
        role="tabpanel"
        aria-labelledby="tabs-with-icons-item-1"
        v-if="tab == 0"
      >
        <div>
          <ListView
            class="h-[250px]"
            :columns="[
              {
                label: 'Opportunities Name',
                key: 'opportunity_name',
              },
              {
                label: 'Opportunity Value',
                key: 'opportunity_value',
                width: '200px',
              },
              {
                label: 'Probability',
                key: 'probability',
              },
              {
                label: 'Status',
                key: 'status',
              },
              {
                label: 'Created On',
                key: 'created_at',
              },
              {
                label: 'Estimate Create',
                key: 'create_estimate',
              },
            ]"
            :rows="opportunities_list"
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
               
                <div @click="handle_opportunity_view(row.id)" class="p-1 h-full cursor-pointer" v-if="item">
                  {{ item }}
                </div>
    
                <div class="p-1" v-if="column.key == 'create_estimate'">
                <Button
                  v-if="row.pdf == null"
                  :variant="'solid'"
                  :ref_for="true"
                  theme="gray"
                  size="sm"
                  label="Button"
                  :loading="false"
                  :loadingText="null"
                  :disabled="false"
                  :link="null"
                  @click="handle_item(row.id)"
                >
                  Create Estimate
                </Button>
                <Button
                  v-else
                  :variant="'subtle'"
                  :ref_for="true"
                  theme="gray"
                  size="sm"
                  label="Button"
                  :loading="false"
                  :loadingText="null"
                  :disabled="false"
                  :link="null"
                  @click="view_estimate(row.id)"
                >
                  View Estimate
                </Button>
              </div>
              </span>
            </template>
          </ListView>
        </div>
      </div>
      <div v-else-if="tab == 1">
        <div>
          <ListView
            class="h-[250px]"
            :columns="[
              {
                label: 'Contact Name',
                key: 'contact_name',
              },
              {
                label: 'Email',
                key: 'contact_email',
              },
              {
                label: 'Phone',
                key: 'contact_phone',
              },
              {
                label: 'Created On',
                key: 'created_on',
              },
            ]"
            :rows="contacts_list"
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
                <div @click="handle_contact_view(row.id)" class="p-1 h-full cursor-pointer" v-if="item">
                  {{ item }}
                </div>
             
              </span>
            </template>
          </ListView>
        </div>
      </div>
      <div v-else>
        <ListView
      class="h-[250px]"
      :columns="[
        {
          label: 'Estimate code ',
          key: 'estimate_number',
          icon: 'user',
          width: '180px',
        },
        { label: 'Organization name', key: 'organization_name', width: '180px' },
       
        { label: 'Grand total', key: 'grand_total', width: '180px' },
        { label: 'Created Date', key: 'created_at', width: '180px' },
        { label: 'Due Date', key: 'issue_date', width: '180px' },
        { label: 'View Estimate', key: 'download', width: '180px' },
      ]"
      :rows="estimate_list"
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

          <div class="p-1" v-if="column.key == 'download'">
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

              @click="view_estimate(row.id)"
            >
              View Estimate
            </Button>
          </div>
        </span>
      </template>
    </ListView>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
