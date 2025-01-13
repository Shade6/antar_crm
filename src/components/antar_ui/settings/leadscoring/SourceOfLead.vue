<script setup>
const emit = defineEmits(["go_back", "selected_source", "value_selected_source"]);
import { TextInput, Button, Autocomplete } from "frappe-ui";
import { ref, watch } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const value_selected_lead = ref({
  value_of_lead_source: null
})

const selected_lead = ref({
  lead_source: null
});

watch(() => selected_lead.value, (newVal) => {
  emit("selected_source", newVal);
}, { deep: true });

watch(() => value_selected_lead.value, (newVal) => {
  emit("value_selected_source", newVal);
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
                    Source of Lead
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
                    class="font-thin w-80 border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
                  >
                    Lead Source
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
                  >
                    <Autocomplete
                       class="bg-white"
                      :options="[
                        {
                          label: 'Website',
                          value: 'website',
                        },
                        {
                          label: 'Social Media',
                          value: 'social_media',
                        },
                        {
                          label: 'Email Campaign',
                          value: 'email_campaign',
                        },
                        {
                          label: 'Referral',
                          value: 'referral',
                        },
                        {
                          label: 'Trade Show',
                          value: 'trade_show',
                        },
                        {
                          label: 'Cold Call',
                          value: 'cold_call',
                        },
                      ]"
                      v-model="selected_lead.lead_source"
                      :multiple="true"
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
                        placeholder="Enter lead source value"
                        :disabled="false"
                        :modelValue="value_selected_lead.value_of_lead_source"
                        v-model="value_selected_lead.value_of_lead_source"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
</template>

<style  scoped>

</style>