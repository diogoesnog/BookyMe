<template>
  <div>
    <v-row no-gutters>
        <v-col cols="2">
          <Navbar/>
        </v-col>

        <v-col cols="10">
          <h1>Add Photos</h1>
          <div style="padding: 15px">
            <v-file-input v-model="file" prepend-icon="mdi-camera" outlined show-size accept="image/png, image/jpeg, image/jpg" label="New Photo"></v-file-input>
            <v-btn color="primary" outlined block @click="uploadPhoto">Upload</v-btn>
            <v-row>
              <v-col v-for="photo in store.photos" :key="photo._id" cols="4">
                <v-img :src="`${base}${photo.url}`" :lazy-src="photo.url" aspect-ratio="1" class="grey lighten-2">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5">
                      </v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <v-btn color="error" block outlined>Delete</v-btn>
              </v-col>
            </v-row>
          </div>

        </v-col>
    </v-row>
  </div>
</template>

<script>
import Service from "@/service/user.service";

export default {
  name: "Photos",
  components: {
    Navbar: () => import('../../components/common/Navbar')
  },

  data() {
    return {
      id: this.$route.params.id,
      store: Object,
      base: String,
      file: null
    }
  },
  mounted() {
    this.getStore();
  },
  methods: {
    getStore() {
      Service.getStoreById(this.id)
          .then(response => {
            this.store = response.data[ "data" ][0];
            this.base = response.data.base;
          }).catch(err => {
            console.log(err);
          })
    },

    uploadPhoto(e) {
      e.preventDefault();
      Service.uploadPhoto(this.id, this.file)
          .then(response => {
            this.store.photos = response.data[ "data" ].data.photos;
          })
          .catch(err => console.log(err));
    }
  }
}
</script>

<style scoped>

</style>