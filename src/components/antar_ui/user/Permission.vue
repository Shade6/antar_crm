<script setup>
import { ref, watch ,onMounted} from "vue";
import { Autocomplete } from "frappe-ui";
import Table from "@/components/antar_ui/user/Table.vue";
import {  findAllRole,findAllRolePermission } from "@/api/userApi.js";
import { useReloadStore } from "@/stores/reload";
const single = ref("");
const searchQuery = ref(""); // Store the search query
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const ReloadStore = useReloadStore();
// Store the original options
const allOptions = ref([]);
const permissions = ref([])

// Reactive filtered options
const filteredOptions = ref([...allOptions.value]);

// Handle selection change
const handle_permission = (data) => {
  console.log(data, "Selected option");
};

// Handle search input
const handleSearch = (query) => {
  console.log(query, "Search query"); // Capture the search query
  searchQuery.value = query;

  // Filter dynamically without modifying original data
  filteredOptions.value = allOptions.value.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
};

const fetch_permission = async(data)=>{
  const res = await findAllRolePermission(data)
  if(res.statusCode == 200){
    permissions.value = res.data
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
watch(
  () => single.value,
  (new_) => {
     fetch_permission(new_.value)
  }
);
watch(
  () => ReloadStore.reload_permission,
  (new_) => {
     fetch_permission(single.value.value)
  }
);
const fetch_role = async()=>{
  const res = await findAllRole();
  if (res.statusCode == 200) {
    allOptions.value = res.data.map((val, i) => ({
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
}
onMounted(fetch_role)
</script>



<template>

  <div>
    <div class="p-2 w-64">
      <div class="p-2">
        <Autocomplete
          :options="allOptions" 
          @change="handle_permission"
          @search="handleSearch"
          v-model="single"
          placeholder="Select role"
        />
      </div>
    </div>

    <!-- Message when no selection -->
    <div v-if="!single" class="flex justify-center text-gray-700 my-36">
      <span>Select Document Type or Role to start.</span>
    </div>

    <!-- Show table when a role is selected -->
    <div class="p-5" v-else>
      <Table :permissions="permissions"/>
    </div>
  </div>
</template>



<style scoped></style>
