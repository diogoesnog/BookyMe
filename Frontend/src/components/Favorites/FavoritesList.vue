<template>
  <div class="q-pa-md" style="padding:35px">
    <q-btn @click="deleteFavorite"></q-btn>
      <q-img
      :src="getImage()"
      spinner-color="white"
      style="height: 170px; max-width: 300px"
      img-class="my-custom-image"
      class="rounded-borders"
      >
      <div class="absolute-bottom text-subtitle1 text-center backgroundColor" > 
          {{this.name}}
          <p>jhh</p>
      </div>
      </q-img>
  </div>
</template>

<script>
import Service from '../../services/user.service'
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
    },

    deleteFavorite() {
      Service.deleteFavorite(this._id)
        .then(response => {
          let data = response.data[ "data" ];
          // TODO: emitir um evento para o parent (a tua view) com o ID do favorito eliminado
          console.log(data);
        })
        .catch(err => console.log(err));
    }
  }
}
</script>

<style scoped>
.absolute-bottom.text-subtitle1.text-center.backgroundColor { 
  background: linear-gradient(#13c1e0, #2897e3);
}
</style>
