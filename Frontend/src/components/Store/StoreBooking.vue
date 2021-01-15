<template>
  <div>
    <q-btn class="botao" rounded label="Faça a sua marcação!" @click="card = true" color="vermelho" icon="event_available"/>

    <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="vermelho"
            icon="event_available"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis" style="margin-top: 10px; color: #434343; font-weight: 700; font-size: 20px;">
              {{ this.name }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-date
              title="{{$t(storePage.date)}}"
              today-btn
              mask="YYYY-MM-DDTHH:mm"
              subtitle="{{$t(storePage.dateSub)}}"
              color="red"
              v-model="date" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-time
            v-model="date"
            format24h
            mask="YYYY-MM-DDTHH:mm"
            color="red" />
        </q-card-section>

        <q-separator/>

        <q-card-actions>
            <q-btn icon="event" @click="makeBooking" style="margin-left: 100px" rounded color="vermelho">
              {{$t('storePage.book')}}
            </q-btn>
        </q-card-actions>

      </q-card>
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
      card: Boolean,
      date: String,
      booking: new Booking()
    }
  },
  beforeMount() {
    this.date = new Date("2021/01/15").toLocaleString();
    this.card = false;
  },
  methods: {
    makeBooking() {
      let booking = new Booking(this.date)

      Service.makeBooking(booking, this.storeID)
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

    // TODO: Fazer só reservas no futuro.
    /*rangeDate(date) {
      let nowDate = new Date();
      return date >= nowDate.getFullYear() + '/' + nowDate.getMonth() + '/' + nowDate.getDay()
    }*/
  }
}
</script>

<style scoped>

.botao {
  position: sticky;
  margin-left: 100px;
  margin-top: 50px;
}

.text-vermelho {
  color: white;
}
.bg-vermelho {
  background: linear-gradient(#e9695c, #e03459);
}



</style>
