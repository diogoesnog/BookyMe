<template>
    <v-container fluid style="height: 100vh;" class="home">
      <img src="../../assets/Logo.png" alt="BookyMe Logo" height="150px">
      <div class="center-content text-center">
        <!--<h2 class="text-center">Choose The Store</h2>-->
        <div class="horizontal-stack">
          <Store v-for="(store, index) in stores" :key="index" v-bind="store" :base="base" class="store-container"></Store>
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
  height:700px;
}
.store-container {
  padding: 15px;
}

.home {
  background-color: #434343;
}

</style>