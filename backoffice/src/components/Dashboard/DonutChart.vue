<template>
  <div id="chart">
    <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

export default {
  name: "DonutChart",
  components: {
    apexchart: VueApexCharts
  },
  props:{
    current: Number,
    canceled: Number,
    concluded: Number
  },
  data: () => ( {
    series: [],

    chartOptions: {
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      labels: ["Reservas", "Concluídas", "Finalizadas"]
    },
  }),
  mounted() {
  },
  watch: {
    current: function (val){
      this.series.push(val)
    },
    concluded: function (val){
      this.series.push(val)
    },
    canceled: function (val){
      this.series.push(val)
    }
  },
}

</script>

<style scoped>

</style>