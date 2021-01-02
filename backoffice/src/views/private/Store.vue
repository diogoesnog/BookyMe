<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <Navbar/>
      </v-col>
      <v-col>
        Content
      </v-col>
    </v-row>

  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import Service from "../../service/user.service"
export default {
  name: "Store",
  components:  {
    Navbar
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