<template>
  <v-container>
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

  </v-container>
</template>

<script>
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
    }
  },

  methods: {
    uploadPhoto(e) {
      e.preventDefault();
      this.$emit('uploadImage', this.file);
    }
  }
}
</script>

<style scoped>

</style>