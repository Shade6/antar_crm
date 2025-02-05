<script setup>
import { defineProps, watch, ref, onMounted } from "vue";
import { Dropdown } from "frappe-ui";
import {find_dashboard_revenue_} from "@/api/userApi"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  () => props.total.revenue,
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
  if (props.total.new_lead) {
    chartData.value = {
      labels: props.total.new_lead.labels,
      datasets: props.total.new_lead.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: dataset.backgroundColor || '#dc7633',
      })),
    };
  }
});
const handle_timeFrame = async (data) => {
  const res = await find_dashboard_revenue_(data);
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

  <div class="border  h-full w-full p-4">
    <div class="flex justify-between px-3 py-2">
      <span class="font-bold"><u>Revenue </u> </span>
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

    <Bar :data="chartData" :key="chartData.labels.join('')" />

  </div>
</template>

<style scoped></style>
