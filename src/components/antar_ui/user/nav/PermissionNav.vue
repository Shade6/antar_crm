<script setup>
import { ref, h ,defineEmits ,onMounted } from "vue";
import { Button, Dropdown, FeatherIcon, Dialog ,TextInput,Autocomplete} from "frappe-ui";
import { useReloadStore } from "@/stores/reload";
import {create_permission,findAllModule,findAllRole} from '@/api/userApi.js'
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const ReloadStore = useReloadStore();
const emit = defineEmits(["go_back"]);

// State to manage modal visibility
const isDialogVisible = ref(false);
const single = ref('')
const selected_module=ref(null)
const selected_role = ref(null)
const module_list =ref([])
const role_list = ref([])
const permission_type = ref("")
// Function to open modal
const openDialog = () => {
  isDialogVisible.value = true;
};

// Function to close modal
const closeDialog = () => {
  isDialogVisible.value = false;
};

const handle_back =()=>{
    emit("go_back");
}
// const handle_save = async () => {
//   const data = {
//     role_name: Role_name.value,
//     role_type: Role_type.value,
//   };
//   const res = await create_permission(data);
//   if (res.statusCode == 200) {
//     toast.success(res.message, {
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
//     ReloadStore.set_permission_reload();
//   } else {
//     toast.success(res.message, {
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
//   }
// };
const fetch_details = async () => {
  try {
    // Await results from Promise.all
    const [module_res, role_res] = await Promise.all([findAllModule(), findAllRole()]);

    // Handle module response
    if (module_res.statusCode === 200) {
      module_list.value =  module_res.data.map((val, i) => ({
        label: val.module_name,
        value: val.module_id
      }));
    } else {
      showErrorToast(module_res.message);
    }

    // Handle role response
    if (role_res.statusCode === 200) {
      role_list.value =  role_res.data.map((val, i) => ({
        label: val.role_name,
        value: val.role_id
      }));
    } else {
      showErrorToast(role_res.message);
    }
  } catch (error) {
    // Catch network or unexpected errors
    console.error("Error fetching details:", error);
    showErrorToast("Failed to fetch details. Please try again.");
  }
};

// Reusable error toast function
const showErrorToast = (message) => {
  toast.success(message, {
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
};


const handle_save = async()=>{
  const details = {
    module_id:selected_module.value.value,
    role_id:selected_role.value.value,
    module_perm_name:permission_type.value
  }
  const res = await create_permission(details)
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
    isDialogVisible.value = false;
    ReloadStore.set_permission_reload();
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
// Fetch details when component is mounted
onMounted(fetch_details);
</script>

<template>
  <div
    class="w-100 px-3 py-4 flex justify-between"
    style="border-top: solid 1px #c0c0c0; border-bottom: solid 1px #c0c0c0"
  >
    <div>
      <span>User</span>
      <Button
        @click="handle_back"
        class="mx-3"
          :variant="'subtle'"
          theme="gray"
          size="sm"
          label="go back"
        />
    </div>

    <div class="gap-2 flex">
      <!-- List View Button -->
      <div class="p-1">
        <Button
          :variant="'subtle'"
          theme="gray"
          size="sm"
          label="List view"
        />
      </div>

      <!-- Reload Button -->
      <div class="p-1">
        <Button
          :variant="'subtle'"
          theme="gray"
          size="sm"
          label="Reload"
        />
      </div>

      <!-- Dropdown Menu -->
      <div class="p-1">
 
  
      <Dropdown
        :options="[
          {
            group: 'Manage',
            items: [
              {
                label: 'Edit Title',
                icon: () => h(FeatherIcon, { name: 'edit' }),
              },
              {
                label: 'Manage Members',
                icon: () => h(FeatherIcon, { name: 'users' }),
              },
            ],
          },
          {
            group: 'Delete',
            items: [
              {
                label: 'Delete users',
                icon: () => h(FeatherIcon, { name: 'edit' }),
              },
              {
                label: 'Delete this project',
                icon: () => h(FeatherIcon, { name: 'trash' }),
              },
            ],
          },
        ]"
      >
        <Button>
          <template #icon>
            <FeatherIcon name="more-horizontal" class="h-4 w-4" />
          </template>
        </Button>
      </Dropdown>
    </div>

      <div class="p-1">
      <Button @click="openDialog" :variant="'solid'"
          theme="gray"
          size="sm"
          label="Add User">Create Permission</Button>
      </div> 

      <!-- Dialog Component -->
      <Dialog v-model="isDialogVisible">
        <template  #body-title>
          <h3>Create New Permission</h3>
        </template>
       
        <template #body-content>
          <div>
            <div class="p-2">
                <span class="font-semibold text-xs text-gray-700">permission type</span>
                <TextInput
                    v-model="permission_type"
                    :type="'text'"
                    :ref_for="true"
                    size="sm"
                    variant="subtle"
                    placeholder="Placeholder"
                    :disabled="false"
                    modelValue=""
                />
                </div>
                <div class="p-2">
                    <span class="font-semibold text-xs text-gray-700">Module</span>
                      <Autocomplete
                        :options="module_list"
                        v-model="selected_module"
                        placeholder="Select person"
                      />
                    </div>
                <div class="p-2">
                    <span class="font-semibold text-xs text-gray-700">Role</span>
                      <Autocomplete
                        :options="role_list"
                        v-model="selected_role"
                        placeholder="Select person"
                      />
                    </div>
            
                
          </div>
        </template>
        <template #actions>
            <div class="flex justify-between">
                <Button class="ml-2" > Edit full Form </Button>
                <Button @click="handle_save" variant="solid">Save Permission</Button>
            </div>
        
         
        </template>
      </Dialog>

      <!-- Add User Button -->
    
    </div>
  </div>
</template>

<style scoped>
</style>
