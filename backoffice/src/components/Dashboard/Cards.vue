<template>
      <v-row>
      <v-col cols="4">
        <v-card
            class="rounded-card"
            color="#2897e3"
        >
          <v-card-title>
            <span class="title">Reservas</span>
          </v-card-title>
          <v-card-text> {{this.current}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
            class="rounded-card"
            color="#13c1e0"
        >
          <v-card-title>
            <span class="title">Concluídas</span>
          </v-card-title>
          <v-card-text> {{this.concluded}}</v-card-text>

        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
            class="rounded-card"
            color="#e03459"
        >
          <v-card-title>
            <span class="title">Cancelamentos</span>
            <v-card-text> {{this.canceled}}</v-card-text>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>

import DashboardServices from "../../service/dashboard"

  export default {
    name: "Cards",
    props:{
      idStore: String,
    },
    data: () => ({
      current: 0,
      canceled: 0,
      concluded: 0
    }),
    mounted() {
      this.getCurrentsReservations(),
      this.getCanceledReservations(),
      this.getConcludedReservations()
    },
    methods:{
      getCurrentsReservations(){
        DashboardServices.getCurrentReservations(this.idStore)
            .then(response => {
              this.current = response["data"]["data"]["count"];
              console.log("Current",this.current)
            })
            .catch (err => {
              window.alert("Error!");
              console.log("OMG",err);
            })
      },
      getCanceledReservations(){
        DashboardServices.getCanceledReservations(this.idStore)
            .then(response => {
              this.canceled = response["data"]["data"]["count"];
              console.log("Canceled",this.canceled)
            })
            .catch (err => {
              window.alert("Error!");
              console.log("OMG",err);
            })
      },
      getConcludedReservations(){
        DashboardServices.getConcludedReservations()
          .then(response => {
            this.concluded = response["data"]["data"]["count"];
            console.log("Concluded",this.concluded)
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
  .title{
    color: ghostwhite;
  }
  .rounded-card{
    border-radius:50px;
  }
</style>
