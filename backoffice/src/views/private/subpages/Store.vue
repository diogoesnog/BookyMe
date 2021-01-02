<template>
  <div>
    General Store Information
  </div>
</template>

<script>
import Service from "../../../service/user.service"
export default {
  name: "Store",
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

</style>