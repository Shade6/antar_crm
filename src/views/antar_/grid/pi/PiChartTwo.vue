

<script setup >
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { Dropdown } from "frappe-ui";


ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = {
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }
  ]
}
</script>

<template>
 <div v-if="false" class="border p-4 h-full w-full">
  
    <div class="flex justify-between px-3 py-2">
      <span class="font-bold"><u>Engagements</u>(last year) </span>
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
        <Pie :data="chartData"  />
    </div>
    <div v-else>
      <span class="font-bold"><u>Engagements</u>(last year) on maintenance </span>
    </div>
</template>

<style scoped>

</style>