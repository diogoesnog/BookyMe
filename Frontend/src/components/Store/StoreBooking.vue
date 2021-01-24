<template>
  <div>
    <div class="divNewReservation" @click="bookingDialog = true">
      {{$t('bookingsPage.newBooking.makeNew')}}
    </div>
    <q-dialog v-model="bookingDialog">
      <q-carousel
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        v-model="slide"
        control-color="red"
        navigation
        arrows
        control-type="regular"
        padding
        height="400px"
        class="cardStyle"
      >
        <q-carousel-slide :name="1" class="column no-wrap flex-center">
          <div v-if="catalog" class="text-center">
            <q-icon name="menu_book" size="50px" style="padding-top: 10px; padding-bottom: 10px"></q-icon>
            <p style="color: #434343; font-weight: 700; font-size: 15px;">{{name}}</p>
            <q-select
              label="Selecione o(s) seu(s) serviço(s)"
              style="width: 220px"
              outlined
              transition-show="scale"
              transition-hide="scale"
              multiple
              counter
              emit-value
              map-options
              hint="Serviços selecionados"

              v-model="booking.serviceId"
              :options="catalog"
              option-value="_id"
              option-label="product"
            />
          </div>
          <div v-else>
            <q-icon name="menu_book" size="50px" style="padding-top: 10px; padding-bottom: 10px"></q-icon>
            <p style="color: #434343; font-weight: 700; font-size: 15px;">{{name}}</p>
            <p style="color: #434343; font-weight: 400; font-size: 15px;">Este estabelecimento não tem catálogo</p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center">
          <div v-if="slots" class="text-center">
            <q-icon name="menu_book" size="50px" style="padding-top: 10px; padding-bottom: 10px"></q-icon>
            <p style="color: #434343; font-weight: 700; font-size: 15px;">{{name}}</p>
            <q-select
              label="Selecione o seu slot"
              style="width: 220px"
              outlined
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
          <div v-else>
            <q-icon name="menu_book" size="50px" style="padding-top: 10px; padding-bottom: 10px"></q-icon>
            <p style="color: #434343; font-weight: 700; font-size: 15px;">{{name}}</p>
            <p style="color: #434343; font-weight: 400; font-size: 15px;">Este estabelecimento não tem slots disponíveis</p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center content-center">
          <q-btn rounded style="position: sticky; margin-top: 40px" color='vermelho' @click="makeBooking">Marque já</q-btn>
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
    name: String
  },
  data() {
    return {
      storeID: this.$route.params.id,
      slide: 1,
      catalog: null,
      slots: null,
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
    }
  }
}
</script>

<style scoped>

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
