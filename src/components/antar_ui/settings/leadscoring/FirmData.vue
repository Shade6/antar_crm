<script setup>
const emit = defineEmits([
  "go_back", 
  "selected_firm_data",
  "value_selected_firm_data",
]);
import { TextInput } from "frappe-ui";
import { ref, watch } from "vue";

const value_selected_lead = ref({
  value_of_annual_revenue: null,
  value_of_budget: null,
});
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
const selected_lead = ref({
  annual_revenue: null,
  budget: null,
});

watch(
  () => selected_lead.value,
  (newVal) => {
    emit("selected_firm_data", newVal);
  },
  { deep: true }
);

watch(
  () => value_selected_lead.value,
  (newVal) => {
    emit("value_selected_firm_data", newVal);
  },
  { deep: true }
);
watch(
  () => props.data,
  (newData) => {
    if (Object.keys(newData).length > 0) {
      selected_lead.value = {
        annual_revenue: newData.selected?.annual_revenue || null,
        budget: newData.selected?.budget || null,
      };

      value_selected_lead.value = {
        value_of_annual_revenue: newData.values?.annual_revenue_value || null,
        value_of_budget: newData.values?.budget_value || null,
      };
    }
  },
  { immediate: true, deep: true }
);
</script>
<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded bg-gray-50"
  >
    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full border-collapse text-blueGray-700">
        <thead class="thead-light">
          <tr>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Firm Data
            </th>
            <th
              class="px-6 w-96 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              selection
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              class="font-thin w-80 border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
            >
              Annual Revenue
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <TextInput
                :type="'number'"
                :ref_for="true"
                size="sm"
                variant="subtle"
                placeholder="Enter annual revenue"
                :disabled="false"
                :modelValue="selected_lead.annual_revenue"
                v-model="selected_lead.annual_revenue"
              />
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <div class="">
                <TextInput
                  :type="'number'"
                  :ref_for="true"
                  size="sm"
                  variant="subtle"
                  placeholder="Enter annual revenue score"
                  :disabled="false"
                  :modelValue="value_selected_lead.value_of_annual_revenue"
                  v-model="value_selected_lead.value_of_annual_revenue"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th
              class="font-thin w-80 border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
            >
              Budget
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <TextInput
                :type="'number'"
                :ref_for="true"
                size="sm"
                variant="subtle"
                placeholder="Enter budget"
                :disabled="false"
                :modelValue="selected_lead.budget"
                v-model="selected_lead.budget"
              />
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <div class="">
                <TextInput
                  :type="'number'"
                  :ref_for="true"
                  size="sm"
                  variant="subtle"
                  placeholder="Enter budget score"
                  :disabled="false"
                  :modelValue="value_selected_lead.value_of_budget"
                  v-model="value_selected_lead.value_of_budget"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
