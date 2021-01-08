<template>
  <div>
      <h1 class ="storeName .text-lg-h6">{{this.store.name}}</h1>
    <v-container grid-list-lg>
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
              <span class="title">Reservas 1</span>
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
              <span class="title">Reservas 2</span>
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
            <span class="title">Reservas 3</span>
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
          <span class="title">Reservas 4</span>
        </v-card-title>
        </v-card>
      </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Service from "../../../service/user.service"

export default {
  name: "StoreDash",
  components:  {
  },
  data() {
    return {
      id: this.$route.params.id,
      store: Object
    }
  },
  mounted() {
    this.getStore();
  },

  methods: {
    getStore() {
      Service.getStoreById(this.id)
        .then(response => {
          // TODO: choose a better endpoint
          this.store = response.data[ "data" ][0];
          console.log(this.store);
        }).catch(err => {
          window.alert("Error!");
          console.log(err);
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
  .title{
    color: ghostwhite;

  }
</style>