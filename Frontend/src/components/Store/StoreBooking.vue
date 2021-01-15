<template>
  <div>
    <q-btn class="botao" rounded label="Faça a sua marcação!" @click="card = true" color="botao" icon="event_available"/>

    <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="event_available"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ this.name }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
              <q-input rounded type="date" hint="Data da marcação" />
              <q-input rounded type="time" hint="Hora da Marcação" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
name: "StoreBooking",
  props: {
    name: String
  },
  data() {
    return {
      card: Boolean

    }
  },
  mounted() {
    this.card = false;
  },
  methods: {
  }
}
</script>

<style scoped>

.botao {
  position: sticky;
  margin-left: 100px;
  margin-top: 50px;
}

.text-botao {
  color: white;
}
.bg-botao {
  background: linear-gradient(#e9695c, #e03459);
}

</style>
