<template>
      <v-row>
      <v-col cols="3">
        <v-card
            class="rounded-card"
            color="#2897e3"
        >
          <v-card-title
          >
            <span class="title">Reservas</span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
            class="rounded-card"
            color="#13c1e0"
        >
          <v-card-title>
            <span class="title">Concluídas</span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
            class="rounded-card"
            color="#e03459"
        >
          <v-card-title>
            <span class="title">Cancelamentos</span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
            class="rounded-card"
            color="#434343"
        >
          <v-card-title>
            <span class="title">Media </span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>

  export default {
    name: "Cards",
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
