<script setup>
const emit = defineEmits(["go_back", "selected_lead_life", "value_selected_lead_life"]);
import { TextInput, Button, Autocomplete } from "frappe-ui";
import { ref, watch } from "vue";

const value_selected_lead = ref({
  value_of_qualified_or_unqualified_lead: null
})

const selected_lead = ref({
  qualified_or_unqualified_lead: null
});

watch(() => selected_lead.value, (newVal) => {
  emit("selected_lead_life", newVal);
}, { deep: true });

watch(() => value_selected_lead.value, (newVal) => {
  emit("value_selected_lead_life", newVal);
}, { deep: true });

</script>
<template>
    <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6  rounded bg-gray-50"
        >
          <div class="block w-full overflow-x-auto">
            <table
              class="items-center w-full border-collapse text-blueGray-700"
            >
              <thead class="thead-light">
                <tr>
                  <th
                    class="px-6 w-80 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  >
                    Lead lifecycle stage
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
                    Qualified or Unqualified lead
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
                      v-model="selected_lead.qualified_or_unqualified_lead"
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
                        placeholder="Enter qualified/unqualified lead value"
                        :disabled="false"
                        :modelValue="value_selected_lead.value_of_qualified_or_unqualified_lead"
                        v-model="value_selected_lead.value_of_qualified_or_unqualified_lead"
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