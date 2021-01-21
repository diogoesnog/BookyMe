<template>
  <div id="chart">
    <apexchart type="donut" :options="chartOptions" :series="series" :labels="labels"></apexchart>
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
 /*   current2 : this.current,
    canceled2: this.canceled,
    concluded2: this.concluded,*/

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
      labels: ["Current", "Concluded", "Canceled"]
    },
  }),
  mounted() {
    this.populateSeries()
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
  methods : {
    populateSeries(){
      /*let series = []

      series.push(this.concluded)
      series.push(this.canceled)
      series.push(this.current)
      this.series = series*/
    }
  }
}
</script>

<style scoped>

</style>