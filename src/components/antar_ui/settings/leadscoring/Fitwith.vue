<script setup>
const emit = defineEmits(["go_back", "selected_fitwith", "value_selected_fitwith"]);
import { TextInput, Button, Select, Autocomplete } from "frappe-ui";
import { ref, watch } from "vue";

const value_selected_lead = ref({
  value_of_is_there_need: null,
  value_of_use_case_alignment: null,
  value_of_unhappy_with_current: null,
  value_of_signup_trial: null,
  value_of_feedback: null
})

const selected_lead = ref({
  is_there_need: null,
  use_case_alignment: null, 
  unhappy_with_current: null,
  signup_trial: null,
  feedback: null
});

watch(() => selected_lead.value, (newVal) => {
  emit("selected_fitwith", newVal);
}, { deep: true });

watch(() => value_selected_lead.value, (newVal) => {
  emit("value_selected_fitwith", newVal);
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
                    Fit with service/product offering
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
                    Is there a need currently?
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
                  >
                    <Autocomplete
                       class="bg-white"
                       :multiple="true"
                       :unique="true"
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
                      v-model="selected_lead.is_there_need"
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
                        placeholder="Enter value"
                        :disabled="false"
                        :modelValue="value_selected_lead.value_of_is_there_need"
                        v-model="value_selected_lead.value_of_is_there_need"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    class="font-thin border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
                  >
                    Use case alignment
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
                  >
                    <Autocomplete
                       class="bg-white"
                       :multiple="true"
                       :unique="true"
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
                      v-model="selected_lead.use_case_alignment"
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
                        placeholder="Enter value"
                        :disabled="false"
                        :modelValue="value_selected_lead.value_of_use_case_alignment"
                        v-model="value_selected_lead.value_of_use_case_alignment"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    class="font-thin border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
                  >
                    Is lead unhappy with current <br />
                    solution and they want to switch
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
                  >
                    <Autocomplete
                       class="bg-white"
                       :multiple="true"
                       :unique="true"
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
                      v-model="selected_lead.unhappy_with_current"
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
                        placeholder="Enter value"
                        :disabled="false"
                        :modelValue="value_selected_lead.value_of_unhappy_with_current"
                        v-model="value_selected_lead.value_of_unhappy_with_current"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    class="font-thin border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
                  >
                    Did they signup for trial?
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
                  >
                    <Autocomplete
                       class="bg-white"
                       :multiple="true"
                       :unique="true"
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
                      v-model="selected_lead.signup_trial"
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
                        placeholder="Enter value"
                        :disabled="false"
                        :modelValue="value_selected_lead.value_of_signup_trial"
                        v-model="value_selected_lead.value_of_signup_trial"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    class="font-thin border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
                  >
                    Feedback provided?
                  </th>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
                  >
                    <Autocomplete
                       class="bg-white"
                       :multiple="true"
                       :unique="true"
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
                      v-model="selected_lead.feedback"
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
                        placeholder="Enter value"
                        :disabled="false"
                        :modelValue="value_selected_lead.value_of_feedback"
                        v-model="value_selected_lead.value_of_feedback"
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