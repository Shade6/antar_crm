<script setup>
const emit = defineEmits([
  "go_back",
  "selected_engagement",
  "value_selected_engagement",
]);
import { TextInput, Button, Select, Autocomplete } from "frappe-ui";
import { ref, watch } from "vue";
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
const value_selected_lead = ref({
  value_of_telephone_conversation: null,
  value_of_response_rate: null,
});

const selected_lead = ref({
  telephone_conversation: null,
  response_rate: null,
});

watch(
  () => selected_lead.value,
  (newVal) => {
    emit("selected_engagement", newVal);
  },
  { deep: true }
);

watch(
  () => value_selected_lead.value,
  (newVal) => {
    emit("value_selected_engagement", newVal);
  },
  { deep: true }
);
watch(
  () => props.data,
  (newData) => {
    if (Object.keys(newData).length > 0) {
      selected_lead.value = {
        telephone_conversation:
          newData.selected?.telephone_conversation || null,
        response_rate: newData.selected?.response_rate || null,
      };

      value_selected_lead.value = {
        value_of_telephone_conversation:
          newData.values?.value_of_telephone_conversation || null,
        value_of_response_rate: newData.values?.value_of_response_rate || null,
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
              class="px-6 w-80 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Engagement with Sales
            </th>
            <th
              class="px-6 bg-blueGray-50 w-96 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
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
              class="font-thin border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
            >
              Telephone conversation
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <Autocomplete
                class="bg-white"
                :options="[
                  {
                    label: 'empty',
                    value: '1-10',
                  },
                  {
                    label: 'low',
                    value: '11-50',
                  },
                  {
                    label: 'medium',
                    value: '51-200',
                  },
                  {
                    label: 'high',
                    value: '201-500',
                  },
                  {
                    label: 'very high',
                    value: '501-1000',
                  },
                  {
                    label: 'excellent',
                    value: 'excellent',
                  },
                ]"
                :multiple="true"
                :unique="true"
                placeholder="Select telephone conversation"
                v-model="selected_lead.telephone_conversation"
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
                  placeholder="Enter telephone conversation value"
                  :disabled="false"
                  :modelValue="
                    value_selected_lead.value_of_telephone_conversation
                  "
                  v-model="value_selected_lead.value_of_telephone_conversation"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th
              class="font-thin border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
            >
              Response rate
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <Autocomplete
                class="bg-white"
                placeholder="Select response rate"
                :options="[
                  {
                    label: 'empty',
                    value: '1-10',
                  },
                  {
                    label: 'low',
                    value: '11-50',
                  },
                  {
                    label: 'medium',
                    value: '51-200',
                  },
                  {
                    label: 'high',
                    value: '201-500',
                  },
                  {
                    label: 'very high',
                    value: '501-1000',
                  },
                  {
                    label: 'excellent',
                    value: 'excellent',
                  },
                ]"
                :multiple="true"
                :unique="true"
                v-model="selected_lead.response_rate"
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
                  placeholder="Enter response rate value"
                  :disabled="false"
                  :modelValue="value_selected_lead.value_of_response_rate"
                  v-model="value_selected_lead.value_of_response_rate"
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
