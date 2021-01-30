<template>
  <v-row>
    <v-col v-for="photo in photos" :key="photo._id" cols="12" md="4" >
      <v-img :src="`${base}${photo.url}`" :lazy-src="photo.url" aspect-ratio="1" class="grey lighten-2">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5">
            </v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-btn color="error" block outlined @click="deletePhoto(photo._id)">Eliminar</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PhotoGrid",
  props: {
    photos: Array,
    base: String
  },

  methods: {
    deletePhoto(id) {
      this.$emit('deletePhoto', id);
    }
  }
}
</script>

<style scoped>

</style>