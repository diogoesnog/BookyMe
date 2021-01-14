<template>
  <div style="padding-top: 25px; margin: 15px;">
    <q-img
      style="height: 200px"
      :src="getImage()"
      class="roundBorder shadow"
    >
      <q-btn class="clearIcon" round @click="deleteFavorite" icon="clear" style="float: right" size="md"></q-btn>
      <div class="cardBackground absolute-bottom text-center" @click="redirect()" style="height:70px">
        <div class="row" style="margin-top: -2px;">
          <div class="col-9" style="text-align: left; margin-top: -5px; display: inline-grid; line-height: 25px;">
            <span style="font-weight: 670; display: inline-block; width: 220px; white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis; font-size: 22px;">
              {{ this.name }}
            </span>
            <span>
              {{ this.address.city }}
            </span>
          </div>
          <div class="col-3" style="padding-top: 4px">
            <div class="divRating shadow">
              <p style="position: relative; top: 51%; left: 47%; transform: translate(-50%, -50%); text-indent: 3px;">
                <span style="font-weight: 670; font-size: 18px; display: inline-block; vertical-align: middle;">
                  {{roundRating(this.rating)}}<span style="font-weight: 200; font-size: 18px;">/5</span>
                </span>
                <i class="fa fa-star" style="font-size:15px; padding-top: 5px;"></i>
              </p>
            </div>
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
        return `http://localhost:5100${this.photos[0].url}`
      }
      return "";
    },

    deleteFavorite() {
      Service.deleteFavorite(this._id)
        .then(response => {
          let data = response.data[ "data" ];
          console.log(data);
        })
        .catch(err => console.log(err));
    },

    roundRating: function(rating) {
      return Math.round(rating*10)/10;
    },

    redirect() {
      this.$router.push({name: 'Store', params:{id:this._id}})
    }

  }
}
</script>

<style scoped>

  .divRating {
    text-align: center;
    height: 30px;
    border-radius: 20px;
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  }

  .cardBackground {
    background-color: rgba(40,151,227, 0.9);
  }

  .clearIcon {
    font-size: 0.85em!important;
    margin: 15px;
    background-color: white;
  }

  .roundBorder {
    border-radius: 25px;
  }

  .shadow {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 28px;
  }

</style>
