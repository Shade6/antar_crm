<script setup >
import { defineProps, watch, ref, onMounted } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { Dropdown } from "frappe-ui";
import {find_dashboard_industry_classification} from "@/api/userApi"


ChartJS.register(ArcElement, Tooltip, Legend)


const props = defineProps({
  total: {
    type: Object,
    required: true,
  },
});

const chartData = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: '#dc7633',
    },
  ],
});

// Immediate watcher to handle initial prop data
watch(
  () => props.total.industry_classification,
  (newLead) => {
    if (newLead) {
      chartData.value = {
        labels: newLead.labels,
        datasets: newLead.datasets.map(dataset => ({
          ...dataset,
          backgroundColor: dataset.backgroundColor || '#dc7633',
        })),
      };
    }
  },
  { immediate: true }
);

// Fallback in case prop data isn't immediately available
onMounted(() => {
  if (props.total.industry_classification) {
    chartData.value = {
      labels: props.total.industry_classification.labels,
      datasets: props.total.industry_classification.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: dataset.backgroundColor || '#dc7633',
      })),
    };
  }
});


const handle_timeFrame = async (data) => {
  const res = await find_dashboard_industry_classification(data);
  if (res.statusCode === 200) {
    
    chartData.value.labels = res.data?.labels;
    chartData.value.datasets = res.data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || '#dc7633',
    }));
  } else {
    alert(res.message);
  }
};


</script>
<template>
 <div class="border p-4 h-full w-full">
     
        <div class="flex justify-between px-3 py-2">
          <span class="font-bold"><u>Industry Classification</u> </span>
          <Dropdown
        class=""
        :options="[
          {
            label: 'last 24 hours',
            onClick: () => {handle_timeFrame('24h')},
          },
          {
            label: 'last 7 days',
            onClick: () => {handle_timeFrame('1w')},
          },
          {
            label: 'last month',
            onClick: () => {handle_timeFrame('1m')},
          },
          {
            label: 'last 6 month',
            onClick: () => {handle_timeFrame('6m')},
          },
          {
            label: 'last year',
            onClick: () => {handle_timeFrame('1y')},
          },
        ]"
        :button="{
          label: 'filter',
        }"
      />
    </div>
        <Pie :data="chartData" :key="chartData.labels.join('')" />
    </div>
</template>

<style scoped>

</style>