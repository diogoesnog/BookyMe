<template>
  <div id="chart">
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>

</template>

<script>

import VueApexCharts from 'vue-apexcharts'
import Dashboard from '../../service/dashboard'

export default {
  name: "LineChart",
  components: {
    apexchart: VueApexCharts,
  },
  data: () => ( {
    dates : [],
    counts: [],
    series: [],
    chartOptions: {},
  }),
  props : {
    idStore : String
  },
  methods: {
    getNumberReservations (){
      console.log("This idStore",this.idStore)
      Dashboard.getNumberReservations(this.idStore)
          .then(response => {
            let temp = response["data"]["data"]
              for (let i in temp){
                this.dates.push(temp[i]["_id"])
                this.counts.push(temp[i]["count"])
              }
            console.log("Dates ",this.dates)
            console.log("Counts", this.counts)
          })
          .catch (err => {
            window.alert("Error!");
            console.log("OMG",err);
          })
    },
    populated(){
      this.series.push({
        name: 'Reservas',
        data: this.counts
      })
      let temp = {
        chart: {
          height: 350,
          type: 'line',
        },
        stroke: {
          width: 7,
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: this.dates,
          tickAmount: 10,
          labels: {
            formatter: function(value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), 'dd MMM')
            }
          }
        },
        title: {
          text: '',
          align: 'left',
          style: {
            fontSize: "16px",
            color: '#666'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: [ '#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          },
        },
        markers: {
          size: 4,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7,
          }
        },
        yaxis: {
          min: 0,
          max: 100,
          title: {
            text: 'Nº de reservas',
          },
        }
      }
      this.chartOptions = temp
    }
  },
  created() {
    this.getNumberReservations()
    this.populated()
  },
}
</script>



<style scoped>

</style>