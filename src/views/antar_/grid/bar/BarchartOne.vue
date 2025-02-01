

<script setup >
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
// import * as chartConfig from './chartConfig.js'
import { Dropdown } from "frappe-ui";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
 const chartData = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#5d6d7e',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
}
</script>

<template>
 <div class="bg-gray-300 h-full w-full">
 
    <div class="flex justify-between px-3 py-2">
      <span class="font-bold"><u>New Lead Created</u> </span>
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