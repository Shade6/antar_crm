<script setup>
import Nav from "../nav/Nav.vue";
import { ref, onMounted, watch } from "vue";
import {
  Button,
  TextInput,
  Autocomplete,
  Dialog,
  FeatherIcon,
} from "frappe-ui";
import { get_all_contact, contact_filter } from "@/api/userApi.js";
import { useToast } from "vue-toast-notification";

const toast = useToast();

const list_name = ref("");
const isLoading = ref(false);
const dialogVisible = ref(false);
const contacts = ref([]);
const selectedContacts = ref(new Set());
const filters = ref({
  field: null,
  type: null,
  search: null,
});

// Fetch all contacts on mount
onMounted(async () => {
  fetch()
});



// Load contacts with current filters
// const loadContacts = async () => {
//   try {
//     const res = await contact_filter({
//       field: filters.value.field?.value,
//       type: filters.value.type?.value,
//       text: filters.value.search,
//     });
    
//     contacts.value = res.data.map(contact => ({
//       id: contact.contact_id,
//       name: `${contact.first_name} ${contact.last_name}`,
//       email: contact.email_id,
//       phone: contact.phone,
//       industry: contact.industry?.industry_name || 'N/A',
//     }));
//   } catch (error) {
//     showError("Failed to load contacts");
//   }
// };
const fetch = async () => {
  const res = await get_all_contact();
  if (res.statusCode == 200) {
    contacts.value = res.data.map((val) => ({
      id: val.contact_id,
      name: val.first_name + " " + val.last_name,
      email: val.email_id,
      industry: val.industry?.industry_name || "no industry",
      mobile: val.phone,
    }));
  } else {
    toast.error(res.message, {
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



// Toggle contact selection
const toggleSelection = (contactId) => {
  if (selectedContacts.value.has(contactId)) {
    selectedContacts.value.delete(contactId);
  } else {
    selectedContacts.value.add(contactId);
  }
  console.log(selectedContacts.value,'------')
};

// Add selected contacts to list
const addSelectedContacts = () => {
  const newContacts = contacts.value.filter(c => 
    selectedContacts.value.has(c.id) && 
    !selectedContacts.value.has(c.id)
  );
  
  selectedContacts.value = new Set([...selectedContacts.value, ...newContacts.map(c => c.id)]);
  dialogVisible.value = false;

};

// Remove contact from selected
const removeContact = (contactId) => {
  selectedContacts.value.delete(contactId);
};



const handle_filter = async (val) => {
  const res = await contact_filter({
    type: { value: filters.value.type.value },
    field: { value: filters.value.field.value },
    text: val,
  });
  if (res.statusCode != 200) {
    return toast.error(res.message, {
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
  contacts.value = res.data.map((val) => ({
    id: val.contact_id,
    name: val.first_name + " " + val.last_name,
    email: val.email_id,
    industry: val.industry?.industry_name || "no industry",
    mobile: val.phone,
  }));
};
watch(
  () => filters.value.search,
  async (value) => {
    handle_filter(value);
  }
);

// Utility functions
const showError = (message) => {
  toast.error(message, { position: "top-right", duration: 3000 });
};

const showSuccess = (message) => {
  toast.success(message, { position: "top-right", duration: 3000 });
};
</script>

<template>
  <Nav @create_campaign_list="handleCreateList" />
  
  <div class="p-4 space-y-4">
    <div>
      <label class="block mb-2">List Name</label>
      <TextInput v-model="list_name" placeholder="Enter list name" />
    </div>

    <div>
      <label class="block mb-2">Selected Contacts ({{ selectedContacts.size }})</label>
      <div class="border rounded p-2 min-h-[100px]">
        <div v-if="selectedContacts.size === 0" class="text-gray-500">
          No contacts selected 
        </div>
        <!-- <div v-for="contact in contacts.filter(c => selectedContacts.has(c.id))" 
             :key="contact.id"
             class="flex items-center justify-between p-2 hover:bg-gray-50">
          <span>{{ contact.name }} ({{ contact.email }})</span>
          <Button @click="removeContact(contact.id)" variant="ghost">
            <FeatherIcon name="x" class="w-4 h-4" />
          </Button>
        </div> -->
        <table v-else class="w-full">
              <thead class="bg-gray-50">
                <tr>
             
                  <th class="text-left p-2">Name</th>
                  <th class="text-left p-2">Email</th>
                  <th class="text-left p-2">Phone</th>
                  <th class="text-left p-2">Industry</th>
                  <th class="text-left p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="contact in contacts.filter(c => selectedContacts.has(c.id))"   class="hover:bg-gray-50 cursor-pointer">
                  <td class="p-2">{{ contact.name }}</td>
                  <td class="p-2">{{ contact.email }}</td>
                  <td class="p-2">{{ contact.mobile }}</td>
                  <td class="p-2">{{ contact.industry }}</td>
                  <td class="p-2">
                    <Button @click="removeContact(contact.id)" variant="ghost">
                        <FeatherIcon name="trash" class="w-4 h-4" />
                      </Button>
                  </td>
                </tr>
              </tbody>
            </table>
      </div>
      
      <Button class="mt-2 flex justify-between w-[150px]" @click="dialogVisible = true">
       <div class="flex">
        <FeatherIcon name="plus" class="w-4 h-4 mr-2" />
        <span>Select Contacts</span> 
       </div>
      
      </Button>
    </div>

    <Dialog v-model="dialogVisible" :options="{ size: '5xl' }">
      <template #body-title>
        <h3 class="text-lg font-semibold">Select Contacts</h3>
      </template>

      <template #body-content>
        <div class="space-y-4">
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block mb-1">Filter Field</label>
              <Autocomplete
                :options="[
                  { label: 'Name', value: 'first_name' },
                  { label: 'Email', value: 'email_id' },
                  { label: 'Phone', value: 'mobile' },
                ]"
                v-model="filters.field"
              />
            </div>
            
            <div class="flex-1">
              <label class="block mb-1">Filter Type</label>
              <Autocomplete
                :options="[
                  { label: 'Contains', value: 'like' },
                  { label: 'Equals', value: 'eq' },
                ]"
                v-model="filters.type"
              />
            </div>
            
            <div class="flex-1">
              <label class="block mb-1">Search</label>
              <TextInput v-model="filters.search" placeholder="Search...">
                <template #prefix>
                  <FeatherIcon name="search" class="w-4 h-4" />
                </template>
              </TextInput>
            </div>
          </div>

          <div class="border rounded overflow-hidden">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="w-12"></th>
                  <th class="text-left p-2">Name</th>
                  <th class="text-left p-2">Email</th>
                  <th class="text-left p-2">Phone</th>
                  <th class="text-left p-2">Industry</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="contact in contacts" :key="contact.id" 
                    class="hover:bg-gray-50 cursor-pointer"
                    @click="toggleSelection(contact.id)">
                  <td class="p-2 text-center">
                    <input type="checkbox" 
                           :checked="selectedContacts.has(contact.id)"
                           class="form-checkbox">
                  </td>
                  <td class="p-2">{{ contact.name }}</td>
                  <td class="p-2">{{ contact.email }}</td>
                  <td class="p-2">{{ contact.mobile }}</td>
                  <td class="p-2">{{ contact.industry }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <template #actions>
        <Button variant="solid" @click="addSelectedContacts">
          Add Selected ({{ selectedContacts.size }})
        </Button>
        <Button variant="ghost" @click="dialogVisible = false">Cancel</Button>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

th, td {
  border-bottom: 1px solid #e5e7eb;
}

tr:last-child td {
  border-bottom: none;
}
</style>