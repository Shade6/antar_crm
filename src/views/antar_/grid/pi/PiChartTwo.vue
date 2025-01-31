

<script setup >
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'


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
 <div class="bg-gray-300 h-full w-full">
    <span class="font-bold"><u>Engagements</u> </span>
        <Pie :data="chartData"  />
    </div>
</template>

<style scoped>

</style>