<template>
  <div class="q-pa-md" style="padding:35px">
    <q-btn @click="deleteFavorite" icon="fas fa-trash"></q-btn>
    <q-img
    :src="getImage()"
    spinner-color="white"
    style="height: 170px; max-width: 300px"
    img-class="my-custom-image"
    class="rounded-borders"
    >
      <div class="absolute-bottom text-subtitle1 text-center backgroundColor" style="height:95px"> 
        <div class="col-6">
          <div class="row" style="font-size:1.4em">
            {{this.name}}
          </div>
          <div class="row" >
            {{this.name}}
          </div>
        </div>
        <div class="col-6">
          <div class="row">
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

  name: "FavoritesList",
  props: {
    _id: String,
    name: String,
    rating: Number,
    photos: Array,
    city: String
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
  opacity:85%;
}

.rounded-borders.q-img.overflow-hidden {
  border-radius: 15px;
}
</style>
