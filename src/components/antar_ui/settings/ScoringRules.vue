<script setup>
const emit = defineEmits(["go_back"]);
import { TextInput, Button, Select } from "frappe-ui";
import Demographic from "./leadscoring/Demographic.vue";
import Behaviour from "./leadscoring/Behaviour.vue";
import Engagment from "./leadscoring/Engagment.vue";
import FirmData from "./leadscoring/FirmData.vue";
import Fitwith from "./leadscoring/Fitwith.vue";
import LeadLife from "./leadscoring/LeadLife.vue";
import SourceOfLead from "./leadscoring/SourceOfLead.vue";
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
    class="px-5 py-3 flex justify-between"
    style="border-bottom: 1px solid #e0e0e0"
  >
    <span class="text-3xl font-semibold text-gray-600">Scoring Rules</span>
    <div class="flex gap-2">
      <div class="p-1">
        <Button
          :variant="'subtle'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
          @click="emit('go_back')"
        >
          Close
        </Button>
      </div>
      <div class="p-1">
        <Button
          :variant="'solid'"
          :ref_for="true"
          theme="gray"
          size="sm"
          label="Button"
          :loading="false"
          :loadingText="null"
          :disabled="false"
          :link="null"
        >
          Save
        </Button>
      </div>
    </div>
  </div>

  <div class="p-5">
    <div class="relative container overflow-y-scroll h-[600px] " style="font-family:system-ui">
      <div class="">
         <Demographic/>

         <FirmData/>
         <Behaviour/>
         <Engagment/>
         <Fitwith/>
         <LeadLife/>
         <SourceOfLead/>

        

        

        

        

       

        <div class="relative overflow-hidden shadow-md mb-10">
          <table class="table-fixed w-full text-left">
            <thead class="uppercase text-black bg-gray-400">
              <tr>
                <td contenteditable="false" class="py-1 border text-center p-4">
                   Assignment Criteria
                </td>
                <td contenteditable="false" class="py-1 border text-center p-4">
                    is grear than
                </td>
                <td contenteditable="false" class="py-1 border text-center p-4">
                    is lesser than
                </td>
              </tr>
            </thead>
            <tbody
              class=""
              style="background-color: #ffffff; color: #6b7280"
            >
              <tr class="py-5">
                <td contenteditable="false" class="py-5 border text-center p-4">
                    Hot Leads
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  500
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  800
                </td>
              </tr>
              <tr class="py-5">
                <td contenteditable="false" class="py-5 border text-center p-4">
                    Warm Leads
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  500
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  800
                </td>
              </tr>
              <tr class="py-5">
                <td contenteditable="false" class="py-5 border text-center p-4">
                    Cold Leads
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  500
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  800
                </td>
              </tr>
          
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
