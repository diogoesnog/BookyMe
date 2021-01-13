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
          <div class="col-6" style="padding: 10px;">
            <span class="titleStore">
              {{ reservation.storeName }}
            </span>
            <span v-if="reservation.hasCatalog == true" class="titleService">
              {{ reservation.service.product }}
            </span>
            <span v-else class="titleService">
              {{$t('bookingsPage.catalog')}}
            </span>
            <span class="hourDate">
              {{ getHourDate(reservation.serviceDate) }}
            </span>
          </div>
          <div class="col-1" style="display: flex; justify-content: center; align-items: center; padding-left: 35px;">
            <img @click="persistent = true" style="height: 25px" src="../../assets/Icons/More.svg"/>
          </div>

          <!-- Pop Up Alterar Reserva -->
          <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-teal text-white" style="width: 300px">
              <q-card-section>
                <div class="text-h6">Persistent</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Click/Tap on the backdrop.
              </q-card-section>

              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

        </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ReservationsList",

  props: {
    _id: String,
    booking: Array
  },

  data() {
    return {
      persistent: false
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

  .titleService {
    text-overflow: ellipsis; 
    font-size: 16px; 
    font-weight: 350; 
    display: inline-block; 
    width: 170px; 
    white-space: nowrap; 
    overflow: hidden !important;
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

</style>
