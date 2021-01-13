<template>
  <v-app>
  <div>
      <h1 class ="storeName .text-lg-h6">{{this.store.name}}</h1>
    <v-container grid-list-lg>
      <Cards></Cards>
    </v-container>
    <v-container grid-list-lg>
      <v-row>
        <v-col cols="6">
          <Calendar></Calendar>
        </v-col>
      </v-row>

    </v-container>
  </div>
  </v-app>
</template>

<script>
import Service from "../../../service/user.service"
import Cards from "../../../components/Dashboard/Cards"
import Calendar from "@/components/Dashboard/Calendar";

export default {
  name: "StoreDash",
  components:  {
    Cards,
    Calendar
  },
  data() {
    return {
      id: this.$route.params.id,
      store: Object,
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
</style>