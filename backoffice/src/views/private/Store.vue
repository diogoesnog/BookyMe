<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <Navbar/>
      </v-col>
      <v-col cols="10">
        <h1 class ="storeName .text-lg-h6">{{this.store.name}}</h1>
        <v-container grid-list-lg>
          <Cards :idStore=id></Cards>
        </v-container>
        <v-row>
          <v-col cols="6"><Calendar :idStore=id></Calendar></v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Service from "../../service/user.service"
import Cards from "../../components/Dashboard/Cards"
import Calendar from "@/components/Dashboard/Calendar"
import Navbar from "@/components/common/Navbar";

export default {
  name: "StoreDash",
  components:  {
    Cards,
    Calendar,
    Navbar
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