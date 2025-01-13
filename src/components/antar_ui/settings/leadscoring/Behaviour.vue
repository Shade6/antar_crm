<script setup>
const emit = defineEmits(["go_back", "selected_behaviour", "value_selected_behaviour"]);
import { TextInput, Button, Select } from "frappe-ui";
import { ref, watch } from "vue";

const value_selected_lead = ref({
  value_of_website_visits: null,
  value_of_email_interaction: null, 
  value_of_content_engagement: null
})

const selected_lead = ref({
  website_visits: null,
  email_interaction: null,
  content_engagement: null
});

watch(() => selected_lead.value, (newVal) => {
  emit("selected_behaviour", newVal);
}, { deep: true });

watch(() => value_selected_lead.value, (newVal) => {
  emit("value_selected_behaviour", newVal);
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
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Behaviour
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
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Enter website visits value"
                        :disabled="false"
                        :modelValue="value_selected_lead.value_of_website_visits"
                        v-model="value_selected_lead.value_of_website_visits"
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
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Enter email interaction value"
                        :disabled="false"
                        :modelValue="value_selected_lead.value_of_email_interaction"
                        v-model="value_selected_lead.value_of_email_interaction"
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
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Enter content engagement value"
                        :disabled="false"
                        :modelValue="value_selected_lead.value_of_content_engagement"
                        v-model="value_selected_lead.value_of_content_engagement"
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