<template>
  <div class="q-pa-md" style="padding:35px">
      <q-img
      :src="getImage()"
      spinner-color="white"
      style="height: 170px; max-width: 300px"
      img-class="my-custom-image"
      class="rounded-borders"
      >
      <div class="absolute-bottom text-subtitle1 text-center">
          {{this.name}}
          <p>jhh</p>
      </div>
      </q-img>
  </div>
</template>

<script>
export default {

  name: "FavoritesList",
  props: {
    _id: String,
    name: String,
    rating: Number,
    photos: Array
  },
  
  data() {
    return {
      favorites: Array
    }
  },

  methods: {
    getImage() {
      let numberPhotos = this.photos.length;
      if(numberPhotos > 0) {
        let i = Math.floor(Math.random() * (numberPhotos + 1));
        return `http://localhost:5100${this.photos[0].url}`
      }
      return "";
    }
  }
}
</script>

<style scoped>

</style>
