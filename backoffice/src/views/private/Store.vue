<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <Navbar/>
      </v-col>
      <v-col cols="10">
        <h1 class ="storeName .text-lg-h6">{{this.store.name}}</h1>
        <v-container grid-list-lg>
          <Cards :canceled=canceled :concluded=concluded :current=current></Cards>
        </v-container>
        <v-row>
          <v-col cols="6">
            <Calendar
                :idStore=id></Calendar>
          </v-col>
          <v-col cols="6">
            <DonutChart
                :canceled=canceled :concluded=concluded :current=current>
            </DonutChart></v-col>

        </v-row>
        <LineChart :idSore="id"></LineChart>
      </v-col>
    </v-row>
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
    Calendar,
    Navbar,
    DonutChart,
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