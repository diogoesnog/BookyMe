<template>
  <div>
    <ReservationBanner v-bind="storeData"/>
    <div class="divBottom">
      <ReservationInfo :services="services" :date="date" :hour="hour"/>
      <StoreMap v-bind="storeData"/>
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
      storeData: {},
      date: String,
      hour: String,
      services: "",
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
  },

  methods: {

    fetchBookingData() {
      this.$q.loading.show({ delay: 400});

      Service.getBookingInfo(this.bookingID)
        .then(response => {

          console.group("Booking Information:")
          let data = response.data["data"];

          let bookingData = data[0].booking[0];
          this.storeID = bookingData["storeId"];

          let parseDate = new Date(bookingData["serviceDate"]);
          this.date = parseDate.toLocaleDateString('pt-pt', {year: '2-digit', day: '2-digit', month: '2-digit'})
          this.hour = parseDate.toLocaleTimeString('pt-pt',{hour: '2-digit', minute: '2-digit'})

          let services = bookingData["service"];
          for (let i = 0; i < services.length; i++) {
            let servicoAtual = services[i];
            let produtoAtual = servicoAtual["product"];
            this.services = this.services + produtoAtual + ", "
          }
          this.services = this.services.substring(0, this.services.length - 2);

          this.fetchStoreData();
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
    padding-top: 65px;
    padding-left: 0;
  }

</style>
