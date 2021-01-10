<template>
  <div>
    <!-- Div Cima (Photo + Info Base) -->
    <div class="divTop" v-bind:style='{ backgroundImage: `url("${this.urlMainPhoto}")` }'>
      <img
        style="height: 200px"
        :src="getImage()"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "StoreData",

  props: {
    _id: String,
    name: String,
    category: String,
    description: String,
    address: Object,
    phone: Number,
    rating: Number,
    photos: Array,
    schedule: Array,
    urlMainPhoto: String
  },

  mounted() {
    this.getImage();
  },

  methods: {
    getImage() {
      let numberPhotos = this.photos.length;
      if(numberPhotos > 0) {
        this.urlMainPhoto = `http://localhost:5100${this.photos[0].url}`;
      }
      else return "";
    }

  }
}
</script>

<style scoped>

  .divTop{
    position: fixed;
    width: 100%;
    height: 70%;
    top: 0;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    background-size: cover;
    background-position: center top;
  }

</style>
