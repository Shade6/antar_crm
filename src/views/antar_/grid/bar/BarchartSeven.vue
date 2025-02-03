<script setup>
import { defineProps, watch, ref, onMounted } from "vue";
import { Dropdown } from "frappe-ui";
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
  () => props.total.top_5_territory,
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
</script>

<template>
 <div class="border p-4 h-full w-full">

    <div class="flex justify-between px-3 py-2">
      <span class="font-bold"><u>Top 5 Territory</u> </span>
      <Dropdown
        class=""
        :options="[
          {
            label: 'last 24 hours',
            onClick: () => {},
          },
          {
            label: 'last 7 days',
            onClick: () => {},
          },
          {
            label: 'last month',
            onClick: () => {},
          },
          {
            label: 'last 6 month',
            onClick: () => {},
          },
          {
            label: 'last year',
            onClick: () => {},
          },
        ]"
        :button="{
          label: 'filter',
        }"
      />
    </div>
        <Bar :data="chartData" />
    </div>
  
</template>

<style scoped>

</style>