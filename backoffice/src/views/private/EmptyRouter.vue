<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <Navbar/>
      </v-col>
      <v-col cols="10">
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import Service from "@/service/user.service";
export default {
  name: "EmptyRouter",
  components: { Navbar },
  data() {
    return {
      id: this.$route.params.id,
      info: {
        store: Object,
        catalog: Object
      },
      base: String
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
            this.info.store = response.data[ "data" ][0];
            this.base = response.data.base;

            // console.log(this.info.store);
          }).catch(err => {
              window.alert("Error!");
              console.log(err);
          })
    },

    uploadImage(data) {
      Service.uploadPhoto(this.id, data)
          .then(response => {
            this.info.store.photos = response.data[ "data" ].data.photos;
          })
          .catch(err => console.log(err));
    }
  }
}
</script>

<style scoped>
.margins {
  padding: 30px;
}
</style>