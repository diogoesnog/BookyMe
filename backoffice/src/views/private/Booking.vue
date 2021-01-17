<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <Navbar/>
      </v-col>
      <v-col cols="10">


        <v-tabs>
          <v-tab>Slots</v-tab>
          <v-tab>Reservas</v-tab>
          <v-tab>Notifições</v-tab>

          <v-tab-item>
            <h2>Slots</h2>
            <Slots v-bind:slots="slots" @newSlot="newSlot"></Slots>
          </v-tab-item>

          <v-tab-item>
            <h2>Reservas</h2>
          </v-tab-item>
          <v-tab-item>
            <h2>Notificações Enviadas</h2>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Service from "@/service/user.service";

export default {
  name: "Booking",

  components: {
    Navbar: () => import('../../components/common/Navbar'),
    Slots: () => import("@/components/Booking/Slots")
  },
  data() {
    return {
      id: this.$route.params.id,
      slots: [],
    }
  },
  mounted() {
    this.getStoreSlots();
  },

  methods: {
    getStoreSlots() {
      Service.getStoreSlots(this.id)
          .then(response => this.slots = response.data["data"])
          .catch(err => console.log(err.data));
    },

    newSlot(data) {
      window.alert("Adding Slot");

      Service.addSlot(this.id, data)
        .then(response => {
          console.log(response);
          this.slots.push(response.data["data"]);
        }).catch(err => console.log(err));
    }
  }
}
</script>

<style scoped>

</style>