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
  website_visits: null,
  email_interaction: null,
  content_engagement: null
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
              <thead class="thead-bold ">
                <tr>
                  <th
                    class="px-6 w-80 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap  text-left"
                  >
                    Behaviour
                  </th>
                  <th
                    class="px-6 w-96 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap  text-left"
                  >
                    Selection
                  </th>
                  <th
                    class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap  text-left"
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody class="font-light">
                <tr>
                  <th
                    class="font-thin border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
                  >
                    Website Visits
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
                      v-model="selected_lead.website_visits"
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
                        placeholder="Enter website visits value"
                        :disabled="false"
                        :modelValue="selected_number_value.website_visits"
                        v-model="selected_number_value.website_visits"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    class="font-thin border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
                  >
                    Email interaction
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
                      v-model="selected_lead.email_interaction"
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
                        placeholder="Enter email interaction value"
                        :disabled="false"
                        :modelValue="selected_number_value.email_interaction"
                        v-model="selected_number_value.email_interaction"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th
                    class="font-thin border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
                  >
                    Content engagement
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
                      v-model="selected_lead.content_engagement"
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
                        placeholder="Enter content engagement value"
                        :disabled="false"
                        :modelValue="selected_number_value.content_engagement"
                        v-model="selected_number_value.content_engagement"
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