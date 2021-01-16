<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <Navbar/>
      </v-col>
      <v-col cols="10">


        <v-tabs>
          <v-tab>Slots</v-tab>
          <v-tab>Bookings</v-tab>
        </v-tabs>
        <Slots :slots="slots"></Slots>
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
          .then(response => {
            this.slots = response.data["data"];
          })
          .catch(err => console.log(err.data));
    }
  }
}
</script>

<style scoped>

</style>