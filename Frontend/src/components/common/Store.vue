<template>
  <div class="q-pa-md" style="padding:35px">
    <q-img
    :src="getImage()"
    spinner-color="white"
    style="height: 170px; max-width: 300px"
    img-class="my-custom-image"
    class="rounded-borders"
    >
      <div class="absolute-bottom text-subtitle1 text-center backgroundColor" style="height:95px">
        <div class="row">
          <div class="col-9">
            <p style="font-size:1.4em">{{ this.name }}</p>
            <p>{{ this.address.city }}</p>
          </div>
          <div class="col-3" style="margin-top:20px;font-size:1.2em">
            {{this.rating}}
            <q-icon class="fas fa-star" style="font-size: 1.4em; margin-left:5px" />
          </div>
        </div>
      </div>
      </q-img>
  </div>
</template>

<script>
import Service from '../../services/user.service'
export default {

  name: "Store",
  props: {
    _id: String,
    name: String,
    rating: Number,
    photos: Array,
    address: Object
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
        // return `${this.base}/${this.photos[0].url}`;
      }
      return "";
    }
  }
}
</script>

<style scoped>
.absolute-bottom.text-subtitle1.text-center.backgroundColor {
  background: linear-gradient(#13c1e0, #2897e3);
  opacity:85%;
}

.rounded-borders.q-img.overflow-hidden {
  border-radius: 15px;
}
</style>
