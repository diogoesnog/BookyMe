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
          <q-form>
              <q-input v-model="booking.serviceDate" rounded type="date" hint="Data da marcação" />
              <q-input rounded type="time" hint="Hora da Marcação" />
          </q-form>
        </q-card-section>
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
      card: Boolean,
      booking: new Booking()

    }
  },
  mounted() {
    this.card = false;
  },
  methods: {
    makeBooking() {
      Service.makeBooking(this.booking)
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

    }
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
