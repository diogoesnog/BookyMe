<template>
  <div style="padding-top: 25px; margin: 15px;">
    <div class="cityDiv" v-bind:style='{ width:`${getWidthNameStore()}`}'>
      {{this._id}}
    </div>
    <div v-for="(reservation, index) in this.booking" :key="index" v-bind="reservation">
      <div class="widgetReservation">
        <!-- Photo (Lado Esquerdo) e Info (Lado Direito) -->
        <div class="row">
          <!-- Photo -->
          <div class="col-5 divPhoto" v-bind:style='{ backgroundImage: `url("${getImage(reservation.mainStorePhotoURL)}")` }'>
          </div>
          <div class="col-6" style="padding: 10px;" @click="redirect(reservation._id)">
            <span class="titleStore">
              {{ reservation.storeName }}
            </span>
            <span v-if="hasCatalog(reservation.hasCatalog) == 0" class="titleService">
              {{ reservation.service.product }}
            </span>
            <span v-else class="titleService">
              {{$t('bookingsPage.catalog')}}
            </span>
            <span class="hourDate">
              {{ getHourDate(reservation.serviceDate) }}
            </span>
          </div>
          <!-- 3 Dots -->
          <div v-if="getTypeReservation() == 0" class="col-1" style="display: flex; justify-content: center; align-items: center; padding-left: 35px;">
            <img @click="persistentChange = true" style="height: 25px" src="../../assets/Icons/More.svg"/>
          </div>
          <!-- Review -->
          <div :id="checkUserReview(reservation.storeId)" v-else-if="getTypeReservation() == 1" class="col-1" style="display: flex; justify-content: center; align-items: center; padding-left: 35px;">
            <div v-if="hasReview" style="text-align: center;">
              <img style="height: 25px" src="icons/Star.svg"/>
            </div>
            <div v-else>
              <img @click="persistentReview = true" style="height: 25px" src="../../assets/Icons/Rating.svg"/>
            </div>
          </div>
          <!-- Pop Up Alterar Reserva -->
          <q-dialog v-model="persistentChange" persistent transition-show="scale" transition-hide="scale">
            <q-card style="color: #434343 !important; width: 100%; border-radius: 40px; text-align: center">
              <q-card-section style="padding: 25px; width: 100%;">
                <span class="titleStorePopup">{{ reservation.storeName }}</span>
                <p style="font-size: 1.2rem; font-weight: 300;">{{$t('bookingsPage.editPopup.title')}}</p>
              </q-card-section>
              <q-card-actions style="margin-left: 20px; margin-right: 20px;" align="center" class="bg-white text-teal">
                <div class="row" style="width: 100%;">
                  <div class="col-12" style="color: #434343; font-size: 20px; font-weight: 600; text-align: left; padding: 10px">
                    <span>{{$t('bookingsPage.editPopup.dateAndTime')}}</span>
                  </div>
                  <div class="col-6" style="padding-right: 10px;">
                    <q-select behavior="menu" rounded outlined v-model="model" :options="options"/>
                  </div>
                  <div class="col-6" style="padding-left: 10px;">
                    <q-select behavior="menu" rounded outlined v-model="model" :options="options"/>
                  </div>
                </div>
              </q-card-actions>
              <q-card-actions style="margin: 20px;" align="center" class="bg-white text-teal">
                <div class="row" style="width: 100%;">
                  <div class="col-6" style="padding-right: 10px;">
                    <q-btn class="q-btn1" rounded :label="$t('bookingsPage.editPopup.changeBooking')" v-close-popup />
                  </div>
                  <div class="col-6" style="padding-left: 10px;">
                    <q-btn class="q-btn2" rounded :label="$t('bookingsPage.editPopup.cancelBooking')" v-close-popup />
                  </div>
                </div>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- Pop Up Review -->
          <q-dialog v-model="persistentReview" persistent transition-show="scale" transition-hide="scale">
            <q-card style="color: #434343 !important; width: 100%; border-radius: 40px; text-align: center">
              <q-card-section style="padding-top: 25px; width: 100%;">
                <span class="titleStorePopup">{{ reservation.storeName }}</span>
                <p style="font-size: 1.2rem; font-weight: 300;">{{$t('bookingsPage.ratePopup.title')}}</p>
              </q-card-section>
              <q-card-section style="top: -20px">
                <q-rating
                  v-model="rating"
                  size="2.5em"
                  icon="img:icons/Star.svg"
                />
              </q-card-section>
              <q-card-section style="top: -20px">
                <span class="subtitle">{{$t('bookingsPage.ratePopup.comment')}}</span>
                <div class="q-pa-md" style="margin-left: 20px; margin-right: 20px; margin-top: 10px;">
                  <q-input
                    v-model="textComment"
                    clearable
                    filled
                    autogrow
                  />
                </div>
              </q-card-section>
              <q-card-actions style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;" align="center" class="bg-white text-teal">
                <div class="row" style="width: 100%;">
                  <div class="col-6" style="padding-right: 10px;">
                    <q-btn @click="addReview(reservation.storeId)" class="q-btn1" rounded :label="$t('bookingsPage.ratePopup.submit')" v-close-popup />
                  </div>
                  <div class="col-6" style="padding-left: 10px;">
                    <q-btn class="q-btn2" rounded :label="$t('bookingsPage.editPopup.cancelBooking')" v-close-popup />
                  </div>
                </div>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Service from '../../services/user.service';

export default {
  name: "ReservationsList",

  props: {
    _id: String,
    booking: Array,
    base: String,
    typeReservation: String,
    idUser: String,
  },

  data() {
    return {
      persistentChange: false,
      persistentReview: false,
      model: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      rating: 4,
      textComment: '',
      userRating: 0,
      hasReview: Boolean,
    }
  },

  methods: {
    getWidthNameStore() {
      if(this._id.length > 0 & this._id.length <= 3) return "15%";
      else if(this._id.length >= 4 & this._id.length <= 6) return "30%";
      else if(this._id.length >= 7 & this._id.length <= 9) return "35%";
      else if(this._id.length >= 10 & this._id.length <= 12) return "45%";
      else if(this._id.length >= 13 & this._id.length <= 15) return "55%";
      else if(this._id.length >= 16 & this._id.length <= 18) return "65%";
      else if(this._id.length >= 19 & this._id.length <= 21) return "75%";
      else return "80%"
    },
    getImage(url) {
      return this.urlMainPhoto = "http://localhost:5100" + url;
    },
    getHourDate(string) {
      var splits = string.split('T', 2);

      // Date
      var date = splits[0];
      var dateSplit = date.split('-', 3);

      var year = dateSplit[0] % 100;
      var day = dateSplit[2];
      var month = dateSplit[1];

      // Hour
      var hour = splits[1];
      var hourSplit = hour.split(':00.000Z', 2)[0];

      return day + "/" + month + "/" + year + " - " + hourSplit;
    },
    hasCatalog: function(string) {
      if (string == "true") return 0;
      else return 1;
    },
    redirect: function(id) {
      this.$router.push({name: 'Reservation', params:{id:id}})
    },
    getTypeReservation() {
      if (this.typeReservation == "current") return 0;
      else return 1;
    },
    addReview: function(id) {
      Service.addReview(this.textComment, this.rating, id)
        .then(response => {
          this.persistentReview = false;
          this.rating = 4;
          this.textComment = "";
        }).catch(err => {
          console.log(err);
        })
    },
    checkUserReview: function(idStore) {
      Service.getReviewsStoreUser(this.idUser, idStore)
        .then(response => {
          this.hasReview = response.data["data"].length > 0;
        })
        .catch(err => {
          console.log(err);
        })
      }
  }
}
</script>

<style scoped>

  .divPhoto {
    width: 30%;
    height: 120px;
    border-bottom-left-radius: 30px;
    border-top-left-radius: 30px;
    background-size: cover;
    background-position: center top;
  }

  .cityDiv {
    background: linear-gradient(#13c1e0, #2897e3);
    color: white;
    height: 40px;
    border-radius: 100px;
    font-size: 20px;
    font-weight: 300;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .widgetReservation {
    height: 120px;
    background-color: white;
    margin-top: 25px;
    border-radius: 30px;
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
  }

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

  .titleStore {
    text-overflow: ellipsis;
    font-size: 20px;
    font-weight: 600;
    display: inline-block;
    width: 170px;
    white-space: nowrap;
    overflow: hidden !important;
  }

  .titleStorePopup {
    text-overflow: ellipsis;
    font-size: 26px;
    font-weight: 600;
    display: inline-block;
    width: 270px;
    white-space: nowrap;
    overflow: hidden !important;
  }

  .titleService {
    text-overflow: ellipsis;
    font-size: 16px;
    font-weight: 350;
    display: inline-block;
    width: 170px;
    white-space: nowrap;
    overflow: hidden !important;
  }

  .subtitle {
    font-size: 18px;
    font-weight: 600;
  }

  .hourDate {
    text-overflow: ellipsis;
    font-size: 20px;
    font-weight: 600;
    display: inline-block;
    width: 160px;
    white-space: nowrap;
    overflow: hidden !important;
  }

  .q-btn1 {
    display: inline-flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    outline: 0;
    border: 0;
    vertical-align: middle;
    font-size: 18px;
    line-height: 1.5em;
    text-decoration: none;
    color: white !important;
    background: linear-gradient(#13c1e0, #2897e3) !important;
    font-weight: 600;
    text-transform: capitalize;
    text-align: center;
    width: 100%;
    height: auto;
  }

  .q-btn2 {
    display: inline-flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    outline: 0;
    border: 0;
    vertical-align: middle;
    padding: 0;
    font-size: 18px;
    line-height: 1.5em;
    text-decoration: none;
    color: white !important;
    background: linear-gradient(#e9695c, #e03459) !important;
    font-weight: 600;
    text-transform: capitalize;
    text-align: center;
    width: 100%;
    height: auto;
  }

</style>
