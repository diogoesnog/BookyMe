<template>
  <div>
    <Navbar/>

    <v-content>
      <v-container fluid>
        <v-row class="fill-height">
          <v-col>
            <v-tabs>
              <v-tab>Slots</v-tab>
              <v-tab>Reservas</v-tab>
              <v-tab>Notifições</v-tab>

              <v-tab-item>
                <h2>Slots</h2>
                <div v-if="slots.length >0">
                  <Slots v-bind:slots="slots" @newSlot="newSlot" @deleteSlot="deleteSlot"></Slots>
                </div>
                <div v-else style="padding: 50px">
                  <p>A loja tem slots disponíveis.</p>
                </div>
              </v-tab-item>

              <v-tab-item>
                <h2>Reservas</h2>
                <div v-if="bookings.length >0">
                  <Services v-bind:bookings="bookings"/>
                </div>
                <div v-else style="padding: 50px">
                  <p>A loja não tem reservas agendadas.</p>
                </div>
              </v-tab-item>
              <v-tab-item>
                <h2>Notificações Enviadas</h2>
                <div v-if="notifications.length >0">
                  <Notifications v-if="notifications.length > 0"/>
                </div>
                <div v-else style="padding: 50px">
                  <p>Não enviou nenhuma notificação para os clientes.</p>
                </div>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Service from "@/service/user.service";

export default {
  name: "Booking",

  components: {
    Navbar: () => import('@/components/common/Navbar'),
    Slots: () => import("@/components/Booking/Slots"),
    Services: () => import("@/components/Booking/Services"),
    Notifications: () => import("@/components/Booking/Notifications")
  },
  data() {
    return {
      id: this.$route.params.id,
      slots: [],
      bookings: [],
      notifications: []
    }
  },
  mounted() {
    this.getStoreSlots();
    this.getStoreServices();
    this.getStoreNotications();
  },

  methods: {
    getStoreNotications() {
      Service.getNofications(this.id)
        .then(response => this.notifications = response.data[ "data" ])
        .catch(err => console.log(err));
    },
    getStoreSlots() {
      Service.getStoreSlots(this.id)
          .then(response => this.slots = response.data["data"])
          .catch(err => console.log(err.data));
    },
    getStoreServices() {
      Service.getStoreServices(this.id)
          .then(response => this.bookings = response.data["data"])
          .catch(err => console.log(err.data));
    },
    newSlot(data) {
      window.alert("Adding Slot");

      Service.addSlot(this.id, data)
        .then(response => {
          console.log(response);
          this.slots.push(response.data["data"]);
        }).catch(err => console.log(err));
    },
    deleteSlot(data) {

      Service.deleteSlot(data._id)
          .then( ()  => this.getStoreSlots())
          .catch(err => {
            window.alert("Não foi possível remover o slot selecionado!");
            console.log(err)
        });
    }
  }
}
</script>

<style scoped>

</style>