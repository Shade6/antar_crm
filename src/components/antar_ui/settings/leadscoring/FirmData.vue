<script setup>
const emit = defineEmits(["go_back", "selected_firm_data", "value_selected_firm_data"]);
import { TextInput, Button, Select, Autocomplete } from "frappe-ui";
import { ref, watch } from "vue";

const value_selected_lead = ref({
  value_of_annual_revenue: null,
  value_of_budget: null
})

const selected_lead = ref({
  annual_revenue: null,
  budget: null
});

watch(() => selected_lead.value, (newVal) => {
  emit("selected_firm_data", newVal);
}, { deep: true });

watch(() => value_selected_lead.value, (newVal) => {
  emit("value_selected_firm_data", newVal);
}, { deep: true });

</script>
<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 rounded bg-gray-50">
    <div class="block w-full overflow-x-auto">
      <table class="items-center w-full border-collapse text-blueGray-700">
        <thead class="thead-light">
          <tr>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Firm Data
            </th>
            <th class="px-6 w-96 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              selection
            </th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="font-thin w-80 border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left">
              Annual Revenue
            </th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
              <TextInput
                  :type="'text'"
                  :ref_for="true"
                  size="sm"
                  variant="subtle"
                  placeholder="Enter annual revenue score"
                  :disabled="false"
                  :modelValue="selected_lead.annual_revenue"
                  v-model="value_selected_lead.value_of_annual_revenue"
                />
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
              <div class="">
                <TextInput
                  :type="'text'"
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
            <th class="font-thin w-80 border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left">
              Budget
            </th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
              <Autocomplete
                class="bg-white"
                :options="[
                  {
                    label: '$0-$10K',
                    value: '0-10K'
                  },
                  {
                    label: '$10K-$50K',
                    value: '10K-50K'
                  },
                  {
                    label: '$50K-$200K',
                    value: '50K-200K'
                  },
                  {
                    label: '$200K+',
                    value: '200K+'
                  }
                ]"
                :multiple="true"
                :unique="true"
                v-model="selected_lead.budget"
              />
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
              <div class="">
                <TextInput
                  :type="'text'"
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

<style scoped>
</style>