<template>
  <div>
    <div class="divNewReservation" @click="bookingDialog = true">
      {{$t('bookingsPage.newBooking.makeNew')}}
    </div>
    <q-dialog v-model="bookingDialog">
      <q-carousel
        swipeable
        animated
        v-model="slide"
        control-color="primary"
        navigation
        arrows
        padding
        height="400px"
        class="cardStyle"
      >
        <q-carousel-slide :name="1" class="column no-wrap flex-center">
          <div class="photoMain" v-bind:style='{ backgroundImage: `url("${getImage()}")` }'/>
          <div class="photoBackground"/>
          <div class="info">
            <span style="font-size: 30px; font-weight: 700;">{{ name }}</span>
            <p style="font-size: 22px; font-weight: 300;">
              {{$t('bookingsPage.newBooking.serviceType')}}
            </p>
          </div>
          <div v-if="catalog" class="choiceDiv">
            <p style="color: #434343; font-weight: 700; font-size: 24px; margin-left: 10px">
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
            <p style="color: #434343; font-weight: 700; font-size: 24px; margin-left: 10px">
              {{$t('bookingsPage.newBooking.chooseService')}}
            </p>
            <p style="color: #434343; font-weight: 300; font-size: 18px; margin-left: 10px">
              {{$t('bookingsPage.newBooking.noServices')}}
            </p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center">
          <div class="photoMain" v-bind:style='{ backgroundImage: `url("${getImage()}")` }'/>
          <div class="photoBackground"/>
          <div class="info">
            <span style="font-size: 30px; font-weight: 700;">{{ name }}</span>
            <p style="font-size: 22px; font-weight: 300;">
              {{$t('bookingsPage.newBooking.dateAndTime')}}
            </p>
          </div>
          <div v-if="slots" class="choiceDiv">
            <p style="color: #434343; font-weight: 700; font-size: 24px; margin-left: 10px">
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
            <p style="color: #434343; font-weight: 700; font-size: 24px; margin-left: 10px">
              {{$t('bookingsPage.newBooking.chooseDataAndTime')}}
            </p>
            <p style="color: #434343; font-weight: 300; font-size: 18px; margin-left: 10px">
              {{$t('bookingsPage.newBooking.noSlots')}}
            </p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center content-center">
          <div>
            Horas: {{parseSlotId()}}
          </div>
          <q-btn rounded style="position: sticky; margin-top: 40px" color='vermelho' @click="makeBooking">
            {{$t('bookingsPage.ratePopup.submit')}}
          </q-btn>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>
  </div>
</template>

<script>

import Booking from '../../models/Booking';
import Service from '../../services/user.service';

export default {
name: "StoreBooking",
  props: {
    name: String,
    photos: Array,
    base: String
  },
  data() {
    return {
      storeID: this.$route.params.id,
      slide: 1,
      catalog: [],
      slots: [],
      booking: new Booking(),
      bookingDialog: false
    }
  },

  mounted() {
    this.fetchCatalog()
    this.fetchFreeSlots()
  },

  methods: {
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

    getImage() {
      return this.urlMainPhoto = this.base + this.photos[0].url;
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

    parseSlotId() {
      let slotId = this.booking.slotId;
      for (let i = 0; i<this.slots.length; i++) {
        let slotObject = this.slots[i];
        if(slotObject["_id"] === slotId) {
          return slotObject["label"];
        }
      }
    },

    parseServiceId() {
      let services = this.booking.serviceId;
      console.group("Parse dos Serviços");
      console.log(this.catalog);
      for (let i = 0; i<this.catalog.length; i++) {
        let catalogObj = this.catalog[i];
        if(catalogObj["_id"] === services[0]) {
          return catalogObj["product"];
        }
      }
      console.groupEnd()
    }
  }
}
</script>

<style scoped>

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
  .iconClose {
    color: white;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  }

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

  .choiceDiv {
    position: absolute;
    top: 170px;
    width: 100%;
    padding: 20px;
  }

  .cardStyle {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    border-radius: 30px;
  }

  .text-vermelho {
    color: white;
  }

  .bg-vermelho {
    background: linear-gradient(#e9695c, #e03459);
  }

  .divNewReservation {
    background-image: linear-gradient(#13c1e0, #2897e3);
    border-radius: 100px;
    font-size: 22px;
    font-weight: 600;
    margin-top: 40px;
    margin-right: 30px;
    margin-left: 30px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  }

</style>
