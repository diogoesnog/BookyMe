<template>
  <div>
    <!--      TODO: Fazer o script para ir buscar as informações da reserva e da loja respetiva -->
    <ReservationBanner />
    <div class="divBottom">
      <ReservationInfo/>
      <StoreMap />
    </div>
    <Toolbar/>
  </div>
</template>

<script>

import Toolbar from 'components/Root/Toolbar';
import Service from '../services/user.service';
import ReservationBanner from "components/Reservation/ReservationBanner";
import StoreMap from "components/Store/StoreMap";
import ReservationInfo from "components/Reservation/ReservationInfo";


export default {

  name: "Reservation",
  components: {
    ReservationInfo,
    ReservationBanner,
    StoreMap,
    Toolbar
  },

  data() {
    return {
      bookingID: this.$route.params.id,
      storeID: String,
      storeData: Object,
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: this.$t('languages.english')},
        { value: 'pt', label: this.$t('languages.portuguese')},
        { value: 'fr', label: this.$t('languages.french')}
      ]
    }
  },

  watch: {
    lang(lang) {
      console.log("Language Change", lang);
      this.$i18n.locale = lang.value;
    }

  },

  mounted() {
    console.log("Mounted: View has been rendered");
    this.fetchBookingData();
    this.fetchStoreData();
  },

  methods: {

    fetchBookingData() {
      this.$q.loading.show({ delay: 400});

      Service.getBookingInfo(this.bookingID)
        .then(response => {
          console.group("Booking Information:")
          let data = response.data["data"];
          this.bookingData = data[0].booking[0];
          console.log("Informação do booking:")
          console.log(this.bookingData);
          console.groupEnd()
        }).catch(err => console.log(err)
      ).finally(() => {
        this.$q.loading.hide();
      })

    },

    fetchStoreData() {
      this.$q.loading.show({ delay: 400});
      Service.getStoreData(this.storeID)
        .then(response => {
          let data = response.data["data"];
          this.storeData = data[0];
          console.log(this.storeData);
        }).catch(err => console.log(err)
      ).finally(() => {
        this.$q.loading.hide();
      })
    }
  }

}

</script>

<style scoped>

  .divBottom {
    position: relative;
    padding-top: 80px;
    padding-left: 0;
  }

</style>
