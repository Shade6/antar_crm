<script setup>
const emit = defineEmits(["go_back","selected_demographic", "value_selected_demographic"]);
import { TextInput, Button, Select, Autocomplete } from "frappe-ui";
import { find_all_industry, find_all_territories } from "@/api/userApi.js";
import "@/assets/toast.css";
import { useToast } from "vue-toast-notification";
const toast = useToast();
import { onMounted, ref, watch } from "vue";


const value_selected_lead = ref({
  value_of_number_of_employees: null,
  value_of_selected_industry: null,
  value_of_selected_job_title: null,
  value_of_selected_territory: null,
})
const selected_lead = ref({
  number_of_employees: null,
  selected_industry: null,
  selected_job_title: null,
  selected_territory: null,
});



const territory_list = ref([]);
const industry_list = ref([]);


const get_territory_list = async () => {
  const res = await find_all_territories();
  if (res.statusCode == 200) {
    territory_list.value = res.data.map((item) => {
      return {
        label: item.territory_name,
        value: item.territory_id,
      };
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
const get_industry_list = async () => {
  const res = await find_all_industry();
  if (res.statusCode == 200) {
    industry_list.value = res.data.map((item) => {
      return {
        label: item.industry_name,
        value: item.industry_id,
      };
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

watch(() => selected_lead.value, (newVal) => {
  emit("selected_demographic", newVal);
}, { deep: true });

watch(() => value_selected_lead.value, (newVal) => {
  emit("value_selected_demographic", newVal); 
}, { deep: true });

onMounted(() => {
  get_territory_list();
  get_industry_list();
});
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
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Demographic
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
        <tbody>
          <tr>
            <th
              class="font-thin border-t-0 w-80 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
            >
              Industry
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <div class="w-full">
                <Autocomplete
                  :options="industry_list"
                  v-model="selected_lead.selected_industry"
                  placeholder="Select industry"
                  :multiple="true"
                  :unique="true"
                />
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <div class="bg-white">
                <TextInput
                  :type="'number'"
                  :ref_for="true"
                  size="sm"
                  variant="subtle"
                  placeholder="Enter website visits score"
                  :disabled="false"
                  :modelValue="value_selected_lead.value_of_selected_industry"
                  v-model="value_selected_lead.value_of_selected_industry"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th
              class="font-thin w-80 border-t-0 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
            >
              Number of employees
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <Autocomplete
                class="bg-white"
                :options="[
                  {
                    label: '1-10',
                    value: '1-10',
                    id: 1
                  },
                  {
                    label: '11-50', 
                    value: '11-50',
                    id: 2
                  },
                  {
                    label: '51-200',
                    value: '51-200',
                    id: 3
                  },
                  {
                    label: '201-500',
                    value: '201-500',
                    id: 4
                  },
                  {
                    label: '501-1000',
                    value: '501-1000',
                    id: 5
                  },
                  {
                    label: '1000+',
                    value: '1000+',
                    id: 6
                  },
                ]"
                :multiple="true"
                :unique="true"
                v-model="selected_lead.number_of_employees"
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
                  placeholder="Enter website visits score"
                  :disabled="false"
                  :modelValue="value_selected_lead.value_of_number_of_employees"
                  v-model="value_selected_lead.value_of_number_of_employees"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th
              class="font-thin border-t-0 w-80 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
            >
              Job title
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
                    label: 'Technology and Software',
                    value: 'Technology and Software',
                  },
                  {
                    label: 'Healthcare',
                    value: 'Healthcare',
                  },
                  {
                    label: 'Finance and Accounting',
                    value: 'Finance and Accounting',
                  },
                  {
                    label: 'Sales and Marketing',
                    value: 'Sales and Marketing',
                  },
                  {
                    label: 'Education and Training',
                    value: 'Education and Training',
                  },
                  {
                    label: 'Operations and Logistics',
                    value: 'Operations and Logistics',
                  },
                  {
                    label: 'Creative and Media',
                    value: 'Creative and Media',
                  },
                  {
                    label: 'Hospitality and Travel',
                    value: 'Hospitality and Travel',
                  },
                  {
                    label: 'Engineering and Manufacturing',
                    value: 'Engineering and Manufacturing',
                  },
                  {
                    label: 'Human Resources',
                    value: 'Human Resources',
                  },
                  {
                    label: 'Legal and Compliance',
                    value: 'Legal and Compliance',
                  },
                ]"
                v-model="selected_lead.selected_job_title"
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
                  placeholder="Enter website visits score"
                  :disabled="false"
                  :modelValue="value_selected_lead.value_of_selected_job_title"
                  v-model="value_selected_lead.value_of_selected_job_title"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th
              class="font-thin border-t-0 w-80 px-6 align-middle border-l-0 border-r-0 p-2 text-left"
            >
              Territory
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <Autocomplete
                :options="territory_list"
                v-model="selected_lead.selected_territory"
                placeholder="Select territory"
                :multiple="true"
                :unique="true"
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
                  placeholder="Enter website visits score"
                  :disabled="false"
                  :modelValue="value_selected_lead.value_of_selected_territory"
                  v-model="value_selected_lead.value_of_selected_territory"
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
