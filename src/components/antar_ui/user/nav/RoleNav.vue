<script setup>
import { ref, h, defineEmits } from "vue";
import {create_role} from '@/api/userApi.js'
import {
  Button,
  Dropdown,
  FeatherIcon,
  Dialog,
  TextInput,
  Autocomplete,
} from "frappe-ui";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
import { useReloadStore } from "@/stores/reload";
const ReloadStore = useReloadStore();
const toast = useToast();
const emit = defineEmits(["go_back"]);
const Role_name = ref("");
const Role_type = ref("");
// State to manage modal visibility
const isDialogVisible = ref(false);
const single = ref("");
// Function to open modal
const openDialog = () => {
  isDialogVisible.value = true;
};

// Function to close modal
const closeDialog = () => {
  isDialogVisible.value = false;
};

const handle_back = () => {
  emit("go_back");
};
const handle_save = async () => {
  const data = {
    role_name: Role_name.value,
    role_type: Role_type.value,
  };
  const res = await create_role(data);
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
    ReloadStore.set_role_reload();
    Role_name.value = ""
    Role_type.value = ""
    isDialogVisible.value = false;
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
        <Button :variant="'subtle'" theme="gray" size="sm" label="List view" />
      </div>

      <!-- Reload Button -->
      <div class="p-1">
        <Button :variant="'subtle'" theme="gray" size="sm" label="Reload" />
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
        <Button
          @click="openDialog"
          :variant="'solid'"
          theme="gray"
          size="sm"
          label="Add User"
        >
          Create Role</Button
        >
      </div>

      <!-- Dialog Component -->
      <Dialog v-model="isDialogVisible">
        <template #body-title>
          <h3>Create New Role</h3>
        </template>

        <template #body-content>
          <div>
            <div class="p-2">
              <span class="font-semibold text-xs text-gray-700">Role Name</span>
              <TextInput
                v-model="Role_name"
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
              <span class="font-semibold text-xs text-gray-700">Role type</span>
              <TextInput
                v-model="Role_type"
                :type="'text'"
                :ref_for="true"
                size="sm"
                variant="subtle"
                placeholder="Placeholder"
                :disabled="false"
                modelValue=""
              />
            </div>
          </div>
        </template>
        <template #actions>
          <div class="flex justify-between">
            <Button class="ml-2"> Edit full Form </Button>
            <Button @click="handle_save" variant="solid"> Save Role</Button>
          </div>
        </template>
      </Dialog>

      <!-- Add User Button -->
    </div>
  </div>
</template>

<style scoped></style>
