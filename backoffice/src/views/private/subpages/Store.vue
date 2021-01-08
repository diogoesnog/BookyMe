<template>
  <div>
      <h1 class ="storeName .text-lg-h6">{{this.store.name}}</h1>
    <v-container grid-list-lg>
      <Cards>
      </Cards>
    </v-container>
  </div>
</template>

<script>
import Service from "../../../service/user.service"
import Cards from "../../../components/Dashboard/Cards"

export default {
  name: "StoreDash",
  components:  {
    Cards
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