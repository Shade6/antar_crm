<script setup>
import { ref, h, defineEmits, onMounted } from "vue";
import {
  Button,
  Dropdown,
  FeatherIcon,
  Dialog,
  TextInput,
  Autocomplete,
} from "frappe-ui";
import { useReloadStore } from "@/stores/reload";
import { create_user, findAllRole } from "@/api/userApi.js";
const ReloadStore = useReloadStore();
const emit = defineEmits(["go_back"]);
const role_array = ref([]);
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
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
const user_first_name = ref("");
const user_last_name = ref("");
const user_email = ref("");
const Role_id = ref(null);
const handle_save = async () => {
  const data = {
    first_name: user_first_name.value,
    last_name: user_last_name.value,
    email: user_email.value,
    role_id: single.value.value,
  };
  const res = await create_user(data);
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
    ReloadStore.set_user_reload();
    isDialogVisible.value = false;
     user_first_name.value = ""
     user_last_name.value = ""
     user_email.value = ""
     single.value = ""
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
const fetch_role = async () => {
  const res = await findAllRole();
  if (res.statusCode == 200) {
    role_array.value = res.data.map((val, i) => ({
        label: val.role_name,
        value: val.role_id
      }));
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
onMounted(fetch_role);
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
          Add User</Button
        >
      </div>

      <!-- Dialog Component -->
      <Dialog v-model="isDialogVisible">
        <template #body-title>
          <h3>Add New User</h3>
        </template>

        <template #body-content>
          <div>
            <div class="p-2">
              <span class="font-semibold text-xs text-gray-700"
                >first name</span
              >
              <TextInput
               v-model="user_first_name"
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
                v-model="user_last_name"
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
                v-model="user_email"
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
                :options="role_array"
                v-model="single"
                placeholder="Select person"
              />
            </div>
          </div>
        </template>
        <template #actions>
          <div class="flex justify-between">
            <Button class="ml-2"> Edit full Form </Button>
            <Button @click="handle_save" variant="solid"> Save User</Button>
          </div>
        </template>
      </Dialog>

      <!-- Add User Button -->
    </div>
  </div>
</template>

<style scoped></style>
