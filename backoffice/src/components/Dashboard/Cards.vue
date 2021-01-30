<template>
  <v-row>
    <v-col cols="12" sm="4">
      <v-card color="#2897e3" style="height:120px">
        <v-card-title>
          <v-icon color="white">
            mdi-calendar-clock
          </v-icon>
          <span class="title">Reservas</span>
        </v-card-title>
        <v-card-text class="text-center">
          <p class="result">{{current}}</p>
        </v-card-text>
      </v-card>
    </v-col>


    <v-col cols="12" sm="4">
      <v-card color="#13c1e0" style="height:120px">
        <v-card-title>
          <v-icon color="white">
            mdi-calendar-multiple-check
          </v-icon>
          <span class="title">Concluídas</span>
        </v-card-title>
        <v-card-text class="text-center">
          <p class="result">{{concluded}}</p>
        </v-card-text>

      </v-card>
    </v-col>


    <v-col cols="12" sm="4">
      <v-card color="#e03459" style="height:120px">
        <v-card-title>
          <v-icon color="white">
            mdi-calendar-remove
          </v-icon>
          <span class="title">Cancelamentos</span>
          <v-card-text class="text-center">
            <p class="result">{{canceled}}</p>
          </v-card-text>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "Cards",
    props:{
      current: Number,
      canceled: Number,
      concluded: Number
    },
  }
</script>


<style scoped>
  .title {
    color: ghostwhite;
    margin-left: 15px;
  }
  .result {
    font-size: 25px;
    color: ghostwhite;
  }
  .rounded-card{
    border-radius:50px;
  }
</style>
