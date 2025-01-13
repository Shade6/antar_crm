<script setup>
const emit = defineEmits(["go_back"]);
import { TextInput, Button, Select } from "frappe-ui";
import { ref } from "vue";
const selected_number_value = ref({
  territory: null,
  industry: null,
  job_title: null,
  annual_revenue: null,
  budget: null,
  website_visits: null,
  email_interaction: null,
  content_engagement: null,
  lead_source: null,
});
const selected_lead = ref({
  number_of_employees: null,
  telephone_conversation: null,
  response_rate: null,
  is_there_a_need_currently: null,
  use_case_alignment: null,
  is_lead_unhappy_with_current_solution: null,
  did_they_signup_for_trial: null,
  feedback_provided: null,
  qualified_or_unqualified_lead: null,
});
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
                    <Select
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
                      v-model="selected_lead.telephone_conversation"
                    />
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
                  >
                    <div class="">
                      <TextInput
                     
                      :type="'text'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Enter website visits score"
                        :disabled="false"
                        :modelValue="selected_lead.website_visits"
                        v-model="selected_lead.website_visits"
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