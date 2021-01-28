<template>
  <div>
    <div class="divTop1" v-bind:style='{ backgroundImage: `url("${getImage(0)}")` }'>
    </div>
    <div>
      <div class="divTop2">
        <div class="row" style="margin: 20px;">
          <div class="col-5" style="display: flex; align-items: center;">
            <q-btn to="../home" padding="6px 6px" class="button shadow" round icon="fas fa-angle-left"/>
          </div>
          <div class="col-5" style="margin-left: auto; display: flex; justify-content: flex-end;">
            <q-btn padding="6px 6px" @click="bookingDialog = true" class="button shadow" round icon="fas fa-plus"/>
            <div style="width:10px; height:auto; display:inline-block;"/>
            <q-btn @click="clickHeart" padding="6px 6px" :class="styleFav" :condition="isFav" round icon="favorite"/>
          </div>
        </div>
        <div class="infoName">
            <span style="font-weight: 670; font-size: 40px;">
              {{ getCutName(this.name) }}
            </span>
          <br/>
          <span style="font-weight: 300; font-size: 20px;">
            {{ $tc('storePage.reservations', getNumberReservations, { count: this.numberReservations }) }}
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
                      {{ roundRating() }}<span style="font-weight: 200; font-size: 19px;">/5</span>
                    </span>
                  <i class="fa fa-star" style="font-size:15px; padding-top: 5px;"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


<!--    Diálogo de reserva-->
    <q-dialog v-model="bookingDialog">
      <q-carousel
        swipeable
        animated
        v-model="slide"
        control-color="primary"
        navigation
        padding
        height="400px"
        class="cardStyle"
      >
        <q-carousel-slide :name="1" class="column no-wrap flex-center">
          <div class="photoMain" v-bind:style='{ backgroundImage: `url("${getImage(0)}")` }'/>
          <div class="photoBackground"/>
          <div class="info">
            <span style="font-size: 30px; font-weight: 700;">{{ name }}</span>
            <p style="font-size: 22px; font-weight: 300;">
              {{$t('bookingsPage.newBooking.serviceType')}}
            </p>
          </div>
          <div v-if="catalog" class="choiceDiv">
            <p style="color: #434343; font-weight: 700; font-size: 24px; margin: 10px">
              {{$t('bookingsPage.newBooking.chooseService')}}
            </p>
            <q-select
              :label="$t('bookingsPage.newBooking.listService')"
              outlined
              rounded
              transition-show="scale"
              transition-hide="scale"
              multiple
              counter
              emit-value
              map-options
              :hint="$t('bookingsPage.newBooking.numberServices')"
              v-model="booking.serviceId"
              :options="catalog"
              option-value="_id"
              option-label="product"
            />
          </div>
          <div v-else class="choiceDiv">
            <p style="color: #434343; font-weight: 700; font-size: 24px; margin: 10px">
              {{$t('bookingsPage.newBooking.chooseService')}}
            </p>
            <p style="color: #434343; font-weight: 300; font-size: 18px; margin: 10px">
              {{$t('bookingsPage.newBooking.noServices')}}
            </p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center">
          <div class="photoMain" v-bind:style='{ backgroundImage: `url("${getImage(0)}")` }'/>
          <div class="photoBackground"/>
          <div class="info">
            <span style="font-size: 30px; font-weight: 700;">{{ name }}</span>
            <p style="font-size: 22px; font-weight: 300;">
              {{$t('bookingsPage.newBooking.dateAndTime')}}
            </p>
          </div>
          <div v-if="slots" class="choiceDiv">
            <p style="color: #434343; font-weight: 700; font-size: 24px; margin: 10px">
              {{$t('bookingsPage.newBooking.chooseDataAndTime')}}
            </p>
            <q-select
              :label="$t('bookingsPage.newBooking.listSlots')"
              outlined
              rounded
              transition-show="scale"
              transition-hide="scale"
              emit-value
              map-options
              v-model="booking.slotId"
              :options="slots"
              option-value="_id"
              option-label="label"
            />
          </div>
          <div v-else class="choiceDiv">
            <p style="color: #434343; font-weight: 700; font-size: 24px; margin: 10px">
              {{$t('bookingsPage.newBooking.chooseDataAndTime')}}
            </p>
            <p style="color: #434343; font-weight: 300; font-size: 18px; margin: 10px">
              {{$t('bookingsPage.newBooking.noSlots')}}
            </p>
            <div class="row" style="margin: 10px">
              <div class="col-12">
                <q-btn rounded style="width: 90%; text-align: center; display: block; margin: 10px auto;" color='azul' dense v-close-popup>
                  {{$t('bookingsPage.newBooking.back')}}
                </q-btn>
              </div>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide v-if="slots" :name="3" class="column no-wrap flex-center content-center">
          <div class="photoMain" v-bind:style='{ backgroundImage: `url("${getImage(0)}")` }'/>
          <div class="photoBackground"/>
          <div class="info">
            <span style="font-size: 30px; font-weight: 700;">{{ name }}</span>
            <p style="font-size: 22px; font-weight: 300;">
              {{$t('bookingsPage.dataNew')}}
            </p>
          </div>
          <div class="choiceDiv">
            <p style="color: #434343; font-weight: 700; font-size: 24px; margin: 10px">
              {{$t('bookingsPage.dataConf')}}
            </p>
            <div class="row">
              <div class="col-6">
                <span class="dateTime">
                  {{$t('bookingsPage.newBooking.date')}}: <span style="font-weight: 300">{{parseSlotId(0)}}</span>
                </span>
              </div>
              <div class="col-6">
                <span class="dateTime">
                  {{$t('bookingsPage.newBooking.time')}}: <span style="font-weight: 300">{{parseSlotId(1)}}</span>
                </span>
              </div>
            </div>
            <div class="row" style="margin: 10px">
              <div class="col-5">
                <q-btn rounded style="width: 100%; margin-top: 30px" color='vermelho' dense v-close-popup>
                  {{$t('bookingsPage.editPopup.cancelBooking')}}
                </q-btn>
              </div>
              <div class="col-2"/>
              <div class="col-5">
                <q-btn rounded style="width: 100%; margin-top: 30px" color='azul' dense v-close-popup @click="makeBooking">
                  {{$t('bookingsPage.ratePopup.submit')}}
                </q-btn>
              </div>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>

  </div>
</template>

<script>

import Service from '../../services/user.service';
import Favorite from "src/models/Favorite";
import Booking from "src/models/Booking";

export default {
  name: "StoreBanner",

  data() {
    return {
      storeID: this.$route.params.id,
      styleFav: String,
      isFav: false,
      disableFav: false,
      reservationsUser: Array,


      // Cenas do diálogo da reserva
      slide: 1,
      catalog: null,
      slots: null,
      booking: new Booking(),
      bookingDialog: false
    }
  },

  props: {
    name: String,
    category: String,
    address: Object,
    rating: Number,
    photos: Array,
  },

  mounted() {
    console.log("Mounted: View has been rendered");
    this.isFavorite(this.storeID);
    this.getReservations();

    // Cenas para o diálogo da reserva
    this.fetchCatalog();
    this.fetchFreeSlots();
  },

  methods: {
    isFavorite(id) {
      Service.isFavorite()
        .then(response => {
          console.group("Verificação de favorito");
          let data = response.data["data"];
          let favorites = data.favorites;
          console.log("Array de favs:");
          console.log(favorites);
          console.log("ID a comparar: " + id)
          let isFav = favorites.indexOf(id) > -1
          if (isFav) {
            this.styleFav = "buttonFavTrue";
            this.isFav = true;

          } else {
            this.styleFav = "buttonFavFalse";
            this.isFav = false;

          }
          console.log("É favorito? " + isFav);
          console.groupEnd();
        }).catch(err => {
        console.log(err);


      })
    },

    clickHeart(){
      if(this.isFav===false){
        this.addFavorite();
        this.isFav=true;
        this.styleFav = "buttonFavTrue";
      }
      else{
        this.deleteFavorite();
        this.isFav=false;
        this.styleFav = "buttonFavFalse";
      }


      },

    deleteFavorite() {
      Service.deleteFavorite(this.storeID)
        .then(response => {
          console.log(response);
          console.log("Removing Favorite");
        }).catch(err => {
          console.log(err);
        })
    },

    addFavorite() {

          let favorite = new Favorite(this.storeID);

          Service.addFavorite(favorite)
            .then(response => {
              this.styleFav = "buttonFavTrue";
              console.log(response);
              console.log("Adding Favorite");
              this.isFav=true;

            }).catch(err => {
            console.log(err);

          })


    },
    getImage(index) {
      return this.urlMainPhoto = `http://localhost:5100${this.photos[index].url}`;
    },
    roundRating() {
      return Math.round(this.rating*10)/10;
    },
    getCutName: function(string) {
      if(string.substring(0,15) === string) return string;
      else return string.substring(0, 15) + "...";
    },
    getReservations() {
      Service.getBookingUserCurrent()
        .then(response => {
          this.reservationsUser = response.data["data"];
          console.log(this.reservationsUser);
        }).catch(err => {
          console.log(err)
        }).finally(() => {
        })
    },
    getNumberReservations() {
      let numberReservations = 0;
      let i;
      for (i = 0; i < this.reservationsUser.length; i++) {
        if(this.reservationsUser[i].storeId === this.storeID) numberReservations = (i+1);
      }
      return numberReservations;
    },

    // Cenas para o diálogo
    makeBooking() {
      Service.makeBooking(this.booking, this.storeID)
        .then(response => {
          console.log("Booking Successful");
          this.$q.notify({
            type: 'positive',
            message: `Booking Successful.`
          });
        })
        .catch(err => {
          console.log(`Error ${err}`);
          this.$q.notify({
            type: 'negative',
            message: 'Failed to Book.'
          });
        })
      console.groupEnd();

    },

    fetchCatalog() {
      Service.getCatalog(this.storeID)
        .then(response => {
          console.group("Procura de catálogo")
          let data = response.data["data"];
          if (data.length > 0) {
            this.catalog = data;
          }
          console.log("Catálogo:");
          console.log(this.catalog);
          console.groupEnd()
        }).catch(err => console.log(err)
      ).finally(() => {
        this.$q.loading.hide();
      })
    },

    fetchFreeSlots() {
      Service.getFreeSlots(this.storeID)
        .then(response => {
          console.group("Procura dos Slots:")
          let data = response.data["data"];
          if (data.length > 0) {
            this.slots = data;
          }
          console.log("Slots:");
          console.log(this.slots);
          console.groupEnd()

          console.group("Parse dos Slots:")
          for (let i=0; i < this.slots.length; i++) {
            let date = new Date(this.slots[i]["date"]);
            this.slots[i]["label"] = date.toLocaleString('pt-pt', {dateStyle: 'short', timeStyle: 'short'});
            console.log(this.slots[i]["label"]);
          }
          console.groupEnd()
        }).catch(err => console.log(err)
      ).finally(() => {
        this.$q.loading.hide();
      })
    },

    parseSlotId(index) {
      let slotId = this.booking.slotId;
      for (let i = 0; i<this.slots.length; i++) {
        let slotObject = this.slots[i];
        if(slotObject["_id"] === slotId) {
          return slotObject["label"].split(", ")[index];
        }
      }
    }
  }

}
</script>

<style scoped>

  .divTop1{
    position: absolute;
    width: 100%;
    padding: 125px;
    background-size: cover;
    background-position: center top;
  }

  .divTop2{
    padding-top: 25px;
    height: 250px;
    position: relative;
    background-image: linear-gradient(#1ba0d4, #1b9fd4c2, #168ab80e);
  }

  .infoName {
    position: relative;
    bottom: 15px;
    color: white;
    text-align: center;
  }

  .infoExtra {
    position: absolute;
    left: 50%;
    padding-top: 15%;
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
    position: absolute;
    background-color: white;
    border-radius: 100px;
    width: 295px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    flex-wrap: nowrap !important;
    padding: 25px;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }

  .button {
    background-color: white;
    color: #1b9fd4;
  }

  .buttonFavFalse {
    background-color: white;
    color: #1b9fd4;
  }

  .buttonFavTrue {
    background-color: white;
    color: #e74165;
    opacity: 1 !important;
  }


/*  Cenas do diálogo da reserva */
  .photoMain {
    background-size: cover;
    width: 100%;
    height: 40%;
    position: absolute;
    top: 0;
  }

  .photoBackground {
    background-image: linear-gradient(#1ba0d4, #1b9fd4c2, #168ab80e);
    width: 100%;
    height: 40%;
    position: absolute;
    top: 0;
  }

  .info {
    position: absolute;
    text-align: center;
    color: white;
    top: 40px;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .choiceDiv {
    position: absolute;
    top: 160px;
    width: 100%;
    padding: 20px;
  }

  .dateTime {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 600;
  }

  .cardStyle {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    border-radius: 30px;
  }

  .text-azul {
    color: white;
  }

  .bg-azul {
    background: linear-gradient(#13c1e0, #2897e3);
  }

  .text-vermelho {
    color: white;
  }

  .bg-vermelho {
    background: linear-gradient(#e9695c, #e03459);
  }

</style>
