<template>
  <div>

    <Navbar/>

    <v-content>
      <v-container fluid>
        <v-row class="fill-height">
          <v-col>
            <h1 class ="storeName .text-lg-h6">{{this.store.name}}</h1>

              <h3>Quick Overview</h3>
              <Cards :canceled=canceled :concluded=concluded :current=current></Cards>

            <v-row>
              <v-col cols="12" md="6">
                <h3>Agendamentos</h3>
                <Calendar :idStore="id"/>
              </v-col>
              <v-col cols="12" md="6">
                <h3>Estatísticas</h3>
                <DonutChart :canceled="canceled" :concluded="concluded" :current="current"/>
              </v-col>
            </v-row>

            <h3>Número de Reservas por Dia</h3>
            <LineChart :idStore=id></LineChart>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Service from "@/service/user.service"
import Cards from "@/components/Dashboard/Cards"
import Calendar from "@/components/Dashboard/Calendar"
import Navbar from "@/components/common/Navbar"
import DashboardServices from "@/service/dashboard"
import DonutChart from "@/components/Dashboard/DonutChart"
import LineChart from "@/components/Dashboard/LineChart"

export default {
  name: "StoreDash",
  components:  {
    Cards,
    Navbar,
    DonutChart,
    Calendar,
    LineChart
  },
  data() {
    return {
      id: this.$route.params.id,
      store: Object,
      current: 0,
      canceled: 0,
      concluded: 0
    }
  },
  mounted() {
    this.getStore(),
    this.getCurrentsReservations(),
    this.getConcludedReservations(),
    this.getCanceledReservations()
  },
  methods: {
    getStore() {
      Service.getStoreById(this.id)
        .then(response => {
          // TODO: choose a better endpoint
          this.store = response.data[ "data" ][0];
          //console.log(this.store);
        }).catch(err => {
          window.alert("Error!");
          console.log(err);
        })
    },
    getCurrentsReservations(){
      DashboardServices.getCurrentReservations(this.id)
          .then(response => {
            this.current = response["data"]["data"]["count"];
            //console.log("Current",this.current)
          })
          .catch (err => {
            window.alert("Error!");
            console.log("OMG",err);
          })
    },
    getCanceledReservations(){
      DashboardServices.getCanceledReservations(this.id)
          .then(response => {
            this.canceled = response["data"]["data"]["count"];
            //console.log("Canceled",this.canceled)
          })
          .catch (err => {
            window.alert("Error!");
            console.log("OMG",err);
          })
    },
    getConcludedReservations(){
      DashboardServices.getConcludedReservations(this.id)
          .then(response => {
            this.concluded = response["data"]["data"]["count"];
            //console.log("Concluded",this.concluded)
          })
          .catch (err => {
            window.alert("Error!");
            console.log("OMG",err);
          })
    }
  }
}
</script>

<style scoped>
  .storeName{
    padding: 15px;
    font-family: "Roboto", sans-serif;
  }
</style>