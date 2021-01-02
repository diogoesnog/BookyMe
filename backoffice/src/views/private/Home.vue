<template>
  <div>
    <h1>Welcome Admin!</h1>
    <p>Choose your store</p>
    <Store v-for="(store, index) in stores" :key="index" v-bind="store"></Store>
  </div>
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
      stores: Array
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

          console.log(this.stores);
        }).catch(err => {
          console.log(err.data);
        });
    }
  }
}
</script>

<style scoped>

</style>