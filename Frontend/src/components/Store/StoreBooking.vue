<template>
  <div>
    <q-btn class="botao" rounded label="Faça a sua marcação!" @click="cardBook = true" color="vermelho" icon="event_available"/>

    <q-dialog v-model="cardBook">
      <q-carousel
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        v-model="slide"
        control-color="primary"
        navigation-icon="radio_button_unchecked"
        navigation-active-icon="radio_button_checked"
        navigation
        arrows
        padding
        height="400px"
        class="bg-white shadow-1 rounded-borders"
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

              v-model="services"
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
          <div class="q-mt-md text-center">
            Selecionar o seu slot de marcação
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center">
          <q-btn>Marque já</q-btn>
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
      cardBook: false,
      slide: 1,
      catalog: null,
      booking: new Booking(),
      services: null
    }
  },
  beforeMount() {
    this.fetchCatalog()
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

    fetchCatalog() {
      Service.getCatalog(this.storeID)
        .then(response => {
          console.group("Procura de catálogo")
          let data = response.data["data"];
          if (data > 0) {
            this.catalog = data;
          }
          console.log("Catálogo:");
          console.log(this.catalog);
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
