<template>
  <!-- Div Cima (Photo + Info Base) -->
  <div class="divTop1" v-bind:style='{ backgroundImage: `url("${getImage(0)}")` }'>
    <div class="divTop2">
      <div class="infoName">
          <span style="font-weight: 670; font-size: 40px;">
            {{ getCutName(this.name) }}
          </span>
        <br/>
        <span style="font-weight: 300; font-size: 20px;">
          {{ getNumberReservations() }}
        </span>
      </div>
      <div class="infoExtra">
        <div class="row rowStyle">
          <div class="col-8" style="text-align: left; margin-top: -8px; display: inline-grid; line-height: 25px;">
              <span style="text-overflow: ellipsis; font-size: 20px; font-weight: 350; display: inline-block; width: 200px; white-space: nowrap; overflow: hidden !important;">
                {{ this.category }}
              </span>
            <span style="font-size: 19px; font-weight: 650; display: inline-block; width:160px; white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis;">
                {{ this.address.city }}
              </span>
          </div>
          <div class="col-4">
            <div class="divRating shadow">
              <p style="position: relative; top: 51%; left: 47%; transform: translate(-50%, -50%); text-indent: 3px;">
                  <span style="font-weight: 670; font-size: 19px; display: inline-block; vertical-align: middle;">
                    {{roundRating(this.rating)}}<span style="font-weight: 200; font-size: 19px;">/5</span>
                  </span>
                <i class="fa fa-star" style="font-size:15px; padding-top: 5px;"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Service from '../../services/user.service';

export default {
  name: "StoreBanner",
  
  data() {
    return {
      reservationsUser: Array,
    }
  },

  props: {
    _id: String,
    name: String,
    category: String,
    address: Object,
    rating: Number,
    photos: Array,
  },

  mounted() {
    console.log("Mounted: View has been rendered");
    this.getReservations();
  },

  methods: {
    getImage(index) {
      return this.urlMainPhoto = `http://localhost:5100${this.photos[index].url}`;
    },
    roundRating: function(rating) {
      return Math.round(rating*10)/10;
    },
    getCutName: function(string) {
      if(string.substring(0,15) === string) return string;
      else return string.substring(0, 15) + "...";
    },
    getReservations() {
      Service.getBookingUser()
        .then(response => {
          let data = response.data["data"];
          this.reservationsUser = data;
        }).catch(err => {
          console.log(err)
        }).finally(() => {
        })
    },
    getNumberReservations() {
      var numberReservations = "0 ";
      var i;
      for (i = 0; i < this.reservationsUser.length; i++) {
        if(this.reservationsUser[i].storeId == this._id) numberReservations = (i+1);
      }
      if(numberReservations == 1) return "1 Reserva"
      else return numberReservations + "Reservas";
    }
  }
}
</script>

<style scoped>

.divTop1{
  position: absolute;
  width: 100%;
  height: 30%;
  top: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-size: cover;
  background-position: center top;
}

.divTop2{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-image: linear-gradient(#1ba0d4, #1b9fd4c2, #168ab80e);
}

.infoName {
  color: white;
  text-align: center;
  padding-top: 80px;
}

.infoExtra {
  color: #434343;
  background-color: white;
  height: 30%;
  width: 75%;
  border-radius: 100px;
  position: absolute;
  left: 50%;
  top: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translate(-50%,-50%);
}

.divRating {
  text-align: center;
  height: 35px;
  border-radius: 20px;
  background: linear-gradient(#e9695c, #e03459);
  color: white;
}

.shadow {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 28px;
}

.rowStyle {
  flex-wrap: nowrap !important;
  padding: 23px;
  position: absolute;
  top: 53%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}

</style>
