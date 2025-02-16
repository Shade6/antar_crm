<script setup>
import { ref, h, onMounted } from "vue";
import { ListView, Button,TextInput } from "frappe-ui";
import { create_campaign_email,get_all_campaign_emails } from "@/api/userApi.js"; // Replace with actual API import
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const campaign_email_list = ref([]);
const current_page = ref(true);
const email_data = ref(null)

const fetch = async () => {
  try {
    const res = await get_all_campaign_emails(); // Use actual API method
    if (res.statusCode === 200) {
      campaign_email_list.value = res.data.map((val) => ({
        id: val.campaign_email_id,
        email: val.email,
        creation:new Intl.DateTimeFormat("en-GB").format(new Date(val?.created_at)),
        is_verified:val.is_verified ? 'verified' : 'not verified'
      }));
    }
  } catch (error) {
    toast.error(error.message || "Failed to fetch emails", {
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

const changeView = () => {
  current_page.value = !current_page.value;
};

const handle_save_email = async()=>{
    const res = await create_campaign_email({email:email_data.value})
    if(res.statusCode == 200){
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
    }else{
        toast.error(error.message || "Failed to fetch emails", {
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

onMounted(() => {
  fetch();
});
</script>

<template>
  <div class="p-3 border-b w-full flex justify-between">
    <span><a href="/antar_/settings">Settings</a> / <span v-if="current_page">Campaign Email List</span><span v-else> Create Campaign Email </span></span>
    <div class="p-1">
      <Button
        v-if="current_page"
        variant="solid"
        theme="gray"
        size="sm"
        @click="changeView"
      >
        Create New
      </Button>
      <div  class="flex"   v-else>

        <Button
        variant="solid"
        theme="gray"
        size="sm"
        @click="handle_save_email"
        
      >
      save
      </Button>
      <div class=" mx-2">
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
            @click="changeView"
        >
        Back to List
        </Button>
        </div>
      </div>

    </div>
  </div>
  <div class="p-4">
    <div v-if="current_page">
      <ListView
        :columns="[
          { label: 'ID', key: 'id', width: '100px' },
          { label: 'Email Address', key: 'email' },
          { label: 'Created Date', key: 'creation' },
          { label: 'Verified', key: 'is_verified' },
          
        ]"
        :rows="campaign_email_list"
        :options="{
          getRowRoute: (row) => ({ params: { id: row.id } }),
          selectable: true,
          showTooltip: true,
          emptyState: {
            title: 'No emails found',
            description: 'Start by creating a new email campaign',
            button: {
              label: 'New Campaign',
              action: () => (current_page = false),
            },
          },
        }"
      />
    </div>
    <div v-else class="p-4 border rounded-lg">
      <!-- Add your create form here -->
      <h2 class="text-lg font-semibold mb-4">Create New Campaign Email</h2>
      <div class="p-2">
        <span class="text-sm font-semibold">Email Address</span>
        <TextInput
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="enter email address"
            :disabled="false"
            :modelValue="email_data"
            v-model="email_data"
        />
        </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
.list-view {
  min-height: 400px;
}
</style>