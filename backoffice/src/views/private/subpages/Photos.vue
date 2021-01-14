<template>
  <v-container>
    <v-file-input v-model="file" prepend-icon="mdi-camera" outlined show-size accept="image/png, image/jpeg, image/jpg" label="New Photo"></v-file-input>

    <v-btn block @click="uploadPhoto">Upload</v-btn>
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
        <v-btn block outlined>Delete</v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import Service from '../../../service/user.service';
export default {
  name: "Photos",
  props: {
    store: Object,
    base: String,
    file: null
  },
  data() {
    return {
      id: this.$route.params.id,
      // store: Object,
      // address: Object,
    }
  },

  methods: {
    uploadPhoto(e) {
      e.preventDefault();

      Service.uploadPhoto(this.id, this.file)
        .then(response => console.log(response.data))
        .catch(err => console.log(err));
    }
  }
}
</script>

<style scoped>

</style>