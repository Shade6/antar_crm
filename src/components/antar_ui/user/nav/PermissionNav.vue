<script setup>
import { ref, h ,defineEmits  } from "vue";
import { Button, Dropdown, FeatherIcon, Dialog ,TextInput,Autocomplete} from "frappe-ui";
import { useReloadStore } from "@/stores/reload.js";
import {create_permission} from '@/api/userApi.js'
const ReloadStore = useReloadStore();
const emit = defineEmits(["go_back"]);

// State to manage modal visibility
const isDialogVisible = ref(false);
const single = ref('')
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
const handle_save = async () => {
  const data = {
    role_name: Role_name.value,
    role_type: Role_type.value,
  };
  const res = await create_permission(data);
  if (res.statusCode == 200) {
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
    ReloadStore.set_permission_reload();
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
                <span class="font-semibold text-xs text-gray-700">first name</span>
                <TextInput
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
                <span class="font-semibold text-xs text-gray-700">last name</span>
                <TextInput
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
                <span class="font-semibold text-xs text-gray-700">email</span>
                <TextInput
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
                    <span class="font-semibold text-xs text-gray-700">Role</span>
  <Autocomplete
    :options="[
      {
        label: 'John Doe',
        value: 'john-doe',
        image: 'https://randomuser.me/api/portraits/men/59.jpg',
      },
      {
        label: 'Jane Doe',
        value: 'jane-doe',
        image: 'https://randomuser.me/api/portraits/women/58.jpg',
      },
      {
        label: 'John Smith',
        value: 'john-smith',
        image: 'https://randomuser.me/api/portraits/men/59.jpg',
      },
      {
        label: 'Jane Smith',
        value: 'jane-smith',
        image: 'https://randomuser.me/api/portraits/women/59.jpg',
      },
      {
        label: 'John Wayne',
        value: 'john-wayne',
        image: 'https://randomuser.me/api/portraits/men/57.jpg',
      },
      {
        label: 'Jane Wayne',
        value: 'jane-wayne',
        image: 'https://randomuser.me/api/portraits/women/51.jpg',
      },
    ]"
    v-model="single"
    placeholder="Select person"
  />
</div>
          </div>
        </template>
        <template #actions>
            <div class="flex justify-between">
                <Button class="ml-2" > Edit full Form </Button>
                <Button variant="solid"> Save User</Button>
            </div>
        
         
        </template>
      </Dialog>

      <!-- Add User Button -->
    
    </div>
  </div>
</template>

<style scoped>
</style>
