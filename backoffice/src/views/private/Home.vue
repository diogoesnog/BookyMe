<template>
    <v-container fluid style="height: 100vh;" class="home">
      <v-row justify="center">
        <img src="../../assets/Logo.png" alt="BookyMe Logo" height="150px">
      </v-row>
      <div class="center-content text-center">
        <div class="horizontal-stack">
          <Store v-for="(store, index) in stores" :key="index" v-bind="store" :base="base" class="store-container"></Store>
          <!--<EmptyCard class="store-container"></EmptyCard>-->
        </div>
      </div>
    </v-container>
</template>

<script>
import Service from '../../service/user.service';
import Store from '../../components/HomePage/Store';
export default {
  name: "Home",
  components: {
    Store
  },
  data() {
    return {
      stores: Array,
      base: String
    }
  },

  mounted() {
    console.log("Component Mounted");
    this.fetchStores();
  },

  methods: {
    fetchStores()  {
      Service.getStores()
        .then(response => {
          this.stores = response.data["data"];
          this.base = response.data.base;

          console.log(this.stores);
        }).catch(err => {
          console.log(err.data);
        });
    }
  }
}
</script>

<style scoped>

.horizontal-stack {
  display: flex;
  overflow-x: auto;
}
.store-container {
  padding: 15px;
}

.home {
  background-color: #434343;
}

</style>