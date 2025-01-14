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
import { ref, computed, onMounted } from "vue";
import {
  get_lead_scoring_rules,
  create_lead_scoring_rules,
} from "@/api/userApi";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();

const demographic_data = ref({});
const Behaviour_data = ref({});
const Engagment_data = ref({});
const FirmData_data = ref({});
const Fitwith_data = ref({});
const LeadLife_data = ref({});
const SourceOfLead_data = ref({});

const totalScore = computed(() => {
  let total = 0;

  if (demographic_data.value?.values) {
    Object.values(demographic_data.value.values).forEach((val) => {
      total += Number(val) || 0;
    });
  }

  if (FirmData_data.value?.values) {
    const values = FirmData_data.value.values;
    if (values.annual_revenue_value) {
      total += typeof values.annual_revenue_value === 'string' ? 
        Number(values.annual_revenue_value) : values.annual_revenue_value;
    }
    if (values.budget_value) {
      total += typeof values.budget_value === 'string' ? 
        Number(values.budget_value) : values.budget_value;
    }
  }

  if (Behaviour_data.value?.values) {
    Object.values(Behaviour_data.value.values).forEach((val) => {
      total += Number(val) || 0;
    });
  }

  if (Engagment_data.value?.values) {
    Object.values(Engagment_data.value.values).forEach((val) => {
      total += Number(val) || 0;
    });
  }

  if (Fitwith_data.value?.values) {
    Object.values(Fitwith_data.value.values).forEach((val) => {
      total += Number(val) || 0;
    });
  }

  if (LeadLife_data.value?.values) {
    Object.values(LeadLife_data.value.values).forEach((val) => {
      total += Number(val) || 0;
    });
  }

  if (SourceOfLead_data.value?.values) {
    Object.values(SourceOfLead_data.value.values).forEach((val) => {
      total += Number(val) || 0;
    });
  }

  return total;
});

const selected_number_value = ref({
  hot_lead_is_greater_than: null,
  hot_lead_is_lesser_than: null,
  warm_lead_is_greater_than: null,
  warm_lead_is_lesser_than: null,
  cold_lead_is_greater_than: null,
  cold_lead_is_lesser_than: null,
});

function selected_demographic(newVal) {
  console.log(newVal);
  demographic_data.value = {
    ...demographic_data.value,
    selected: newVal,
  };
}
function value_selected_demographic(newVal) {
  console.log(newVal);
  demographic_data.value = {
    ...demographic_data.value,
    values: newVal,
  };
}

function selected_firm_data(newVal) {
  console.log(newVal);
  FirmData_data.value = {
    ...FirmData_data.value,
    selected: newVal,
  };
}

function value_selected_firm_data(newVal) {
  // Fix: Update FirmData values correctly
  const values = {
    annual_revenue_value: newVal.value_of_annual_revenue,
    budget_value: newVal.value_of_budget
  };
  
  FirmData_data.value = {
    ...FirmData_data.value,
    values: values
  };
}

function selected_behaviour(newVal) {
  console.log(newVal);
  Behaviour_data.value = {
    ...Behaviour_data.value,
    selected: newVal,
  };
}

function value_selected_behaviour(newVal) {
  console.log(newVal);
  Behaviour_data.value = {
    ...Behaviour_data.value,
    values: newVal,
  };
}

function selected_engagement(newVal) {
  console.log(newVal);
  Engagment_data.value = {
    ...Engagment_data.value,
    selected: newVal,
  };
}

function value_selected_engagement(newVal) {
  console.log(newVal);
  Engagment_data.value = {
    ...Engagment_data.value,
    values: newVal,
  };
}

function selected_fitwith(newVal) {
  console.log(newVal);
  Fitwith_data.value = {
    ...Fitwith_data.value,
    selected: newVal,
  };
}

function value_selected_fitwith(newVal) {
  console.log(newVal);
  Fitwith_data.value = {
    ...Fitwith_data.value,
    values: newVal,
  };
}

function selected_lead_life(newVal) {
  console.log(newVal);
  LeadLife_data.value = {
    ...LeadLife_data.value,
    selected: newVal,
  };
}

function value_selected_lead_life(newVal) {
  console.log(newVal);
  LeadLife_data.value = {
    ...LeadLife_data.value,
    values: newVal,
  };
}

function selected_source(newVal) {
  console.log(newVal);
  SourceOfLead_data.value = {
    ...SourceOfLead_data.value,
    selected: newVal,
  };
}

function value_selected_source(newVal) {
  console.log(newVal);
  SourceOfLead_data.value = {
    ...SourceOfLead_data.value,
    values: newVal,
  };
}

const save_scoring_rules = async () => {
  const res = await create_lead_scoring_rules({
    demographic_data: demographic_data.value,
    FirmData_data: FirmData_data.value,
    Behaviour_data: Behaviour_data.value,
    Engagment_data: Engagment_data.value,
    Fitwith_data: Fitwith_data.value,
    LeadLife_data: LeadLife_data.value,
    SourceOfLead_data: SourceOfLead_data.value,
    LeadScore_data:selected_number_value.value
  });
  if (res.statusCode == 200) {
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
      style: {
        background: "white",
        color: "black",
        padding: "4px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderLeft: "5px solid green",
      },
    });
  } else {
    toast.success(res.message, {
      position: "top-right",
      duration: 3000,
      dismissible: true,
      style: {
        background: "#FFF5F5",
        color: "black",
        padding: "4px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderLeft: "5px solid red",
      },
    });
  }
};
onMounted(() => {
  get_lead_scoring_rules().then((res) => {
    console.log(res.data, "res");
    demographic_data.value = {
      selected: {
        number_of_employees: res.data.number_of_employees
          ? JSON.parse(res.data.number_of_employees)
          : [],
        selected_industry: res.data.industry
          ? JSON.parse(res.data.industry)
          : [],
        selected_job_title: res.data.job_title
          ? JSON.parse(res.data.job_title)
          : [],
        selected_territory: res.data.territory
          ? JSON.parse(res.data.territory)
          : [],
      },
      values: {
        value_of_number_of_employees: res.data.number_of_employees_value || 0,
        value_of_selected_industry: res.data.industry_value || 0,
        value_of_selected_job_title: res.data.job_title_value || 0,
        value_of_selected_territory: res.data.territory_value || 0,
      },
    };
    FirmData_data.value = {
      selected: {
        annual_revenue: res.data.annual_revenue || 0,
        budget: res.data.budget || 0,
      },
      values: {
        annual_revenue_value: res.data.annual_revenue_value || 0,
        budget_value: res.data.budget_value || 0,
      },
    };
    Behaviour_data.value = {
      selected: {
        website_visits: res.data.website_visits
          ? JSON.parse(res.data.website_visits)
          : [],
        email_interaction: res.data.email_interaction
          ? JSON.parse(res.data.email_interaction)
          : [],
        content_engagement: res.data.content_engagement
          ? JSON.parse(res.data.content_engagement)
          : [],
      },
      values: {
        value_of_website_visits: res.data.website_visits_value || 0,
        value_of_email_interaction: res.data.email_interaction_value || 0,
        value_of_content_engagement: res.data.content_engagement_value || 0,
      },
    };
    Engagment_data.value = {
      selected: {
        telephone_conversation: res.data.telephone_conversation
          ? JSON.parse(res.data.telephone_conversation)
          : [],
        response_rate: res.data.response_rate
          ? JSON.parse(res.data.response_rate)
          : [],
      },
      values: {
        value_of_telephone_conversation:
          res.data.telephone_conversation_value || 0,
        value_of_response_rate: res.data.response_rate_value || 0,
      },
    };
    Fitwith_data.value = {
      selected: {
        is_there_need: res.data.is_there_a_need_currently ? JSON.parse(res.data.is_there_a_need_currently) : [],
        use_case_alignment: res.data.use_case_alignment ? JSON.parse(res.data.use_case_alignment) : [],
        unhappy_with_current: res.data.is_lead_unhappy_with_current_solution ? JSON.parse(res.data.is_lead_unhappy_with_current_solution) : [],
        signup_trial: res.data.did_they_signup_for_trial ? JSON.parse(res.data.did_they_signup_for_trial) : [],
        feedback_provided: res.data.feedback_provided ? JSON.parse(res.data.feedback_provided) : [],
      },
      values: {
        value_of_is_there_need: res.data.is_there_a_need_currently_value || 0,
        value_of_use_case_alignment: res.data.use_case_alignment_value || 0,
        value_of_unhappy_with_current: res.data.is_lead_unhappy_with_current_solution_value || 0,
        value_of_signup_trial: res.data.did_they_signup_for_trial_value || 0,
        value_of_feedback: res.data.feedback_provided_value || 0,
      },
    };

    LeadLife_data.value = {
      selected: {
        qualified_or_unqualified_lead: res.data.qualified_or_unqualified_lead ? JSON.parse(res.data.qualified_or_unqualified_lead) : [],
      },
      values: {
        value_of_qualified_or_unqualified_lead: res.data.qualified_or_unqualified_lead_value || 0,
      },
    };
    SourceOfLead_data.value = {
      selected: {
        lead_source: res.data.lead_source ? JSON.parse(res.data.lead_source) : [],
      },
      values: {
        value_of_lead_source: res.data.lead_source_value || 0,
      },
    };

    selected_number_value.value = {
      hot_lead_is_greater_than: res.data.hot_lead_is_greater_than || 0,
      hot_lead_is_lesser_than: res.data.hot_lead_is_lesser_than || 0,
      warm_lead_is_greater_than: res.data.warm_lead_is_greater_than || 0,
      warm_lead_is_lesser_than: res.data.warm_lead_is_lesser_than || 0,
      cold_lead_is_greater_than: res.data.cold_lead_is_greater_than || 0,
      cold_lead_is_lesser_than: res.data.cold_lead_is_lesser_than || 0,
    };
  });
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
         
          @click="save_scoring_rules"
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
    <div
      class="relative container overflow-y-scroll h-[600px]"
      style="font-family: system-ui"
    >
      <div class="">
        <Demographic
          :data="demographic_data"
          @selected_demographic="selected_demographic"
          @value_selected_demographic="value_selected_demographic"
        />

        <FirmData
          :data="FirmData_data"
          @selected_firm_data="selected_firm_data"
          @value_selected_firm_data="value_selected_firm_data"
        />
        <Behaviour
          :data="Behaviour_data"
          @selected_behaviour="selected_behaviour"
          @value_selected_behaviour="value_selected_behaviour"
        />
        <Engagment
          :data="Engagment_data"
          @selected_engagement="selected_engagement"
          @value_selected_engagement="value_selected_engagement"
        />
        <Fitwith
          :data="Fitwith_data"
          @selected_fitwith="selected_fitwith"
          @value_selected_fitwith="value_selected_fitwith"
        />
        <LeadLife
          :data="LeadLife_data"
          @selected_lead_life="selected_lead_life"
          @value_selected_lead_life="value_selected_lead_life"
        />
        <SourceOfLead
          :data="SourceOfLead_data"
          @selected_source="selected_source"
          @value_selected_source="value_selected_source"
        />

        <div class="">
          <span>Total Points added:</span>
          <span>{{ totalScore }}</span>
        </div>

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
            <tbody class="" style="background-color: #ffffff; color: #6b7280">
              <tr class="py-5">
                <td contenteditable="false" class="py-5 border text-center p-4">
                  Hot Leads
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  <input
                    type="number"
                    v-model="selected_number_value.hot_lead_is_greater_than"
                    class="w-full text-center bg-transparent"
                    value="500"
                  />
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  <input
                    type="number"
                    v-model="selected_number_value.hot_lead_is_lesser_than"
                    class="w-full text-center bg-transparent"
                    value="800"
                  />
                </td>
              </tr>
              <tr class="py-5">
                <td contenteditable="false" class="py-5 border text-center p-4">
                  Warm Leads
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  <input
                    type="number"
                    v-model="selected_number_value.warm_lead_is_greater_than"
                    class="w-full text-center bg-transparent"
                    value="500"
                  />
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  <input
                    type="number"
                    v-model="selected_number_value.warm_lead_is_lesser_than"
                    class="w-full text-center bg-transparent"
                    value="800"
                  />
                </td>
              </tr>
              <tr class="py-5">
                <td contenteditable="false" class="py-5 border text-center p-4">
                  Cold Leads
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  <input
                    type="number"
                    v-model="selected_number_value.cold_lead_is_greater_than"
                    class="w-full text-center bg-transparent"
                    value="500"
                  />
                </td>
                <td contenteditable="true" class="py-5 border text-center p-4">
                  <input
                    type="number"
                    v-model="selected_number_value.cold_lead_is_lesser_than"
                    class="w-full text-center bg-transparent"
                    value="800"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
