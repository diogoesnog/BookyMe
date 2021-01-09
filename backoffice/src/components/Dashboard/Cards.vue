<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-card
            class="pa-2"
            color="#F44336"
            elevation="12"
            tile
        >
          <v-card-title
          >
            <span class="title">Reservas Atuais</span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
            class="pa-2"
            color="#2196F3"
            elevation="3"
            tile
        >
          <v-card-title>
            <span class="title">Reservas Concluídas</span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
            class="pa-2"
            color="#4CAF50"
            elevation="3"
            tile
        >
          <v-card-title>
            <span class="title">Reservas Canceladas</span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
            class="pa-2"
            color="#FFEB3B"
            elevation="3"
            tile
        >
          <v-card-title>
            <span class="title">Média Total de Reservas por dia</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Cards"

}
</script>


<style scoped>
  .title{
    color: ghostwhite;

  }
</style>
