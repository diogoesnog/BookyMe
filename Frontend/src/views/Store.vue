<template>
  <div>
    <StoreBanner v-bind="storeData"/>
    <div class="divBottom">
      <StorePhotos v-bind="storeData"/>
      <StoreDescription v-bind="storeData"/>
      <StoreMap v-bind="storeData"/>
      <StoreCatalog v-bind="storeData"/>
      <StoreBooking v-bind="storeData"/>
      <StoreRatings v-bind="storeData"/>
    </div>
    <Toolbar/>
  </div>
</template>

<script>

import Toolbar from 'components/Root/Toolbar';
import Service from '../services/user.service'
import StoreBanner from 'components/Store/StoreBanner';
import StoreRatings from "components/Store/StoreRatings";
import StorePhotos from "components/Store/StorePhotos";
import StoreMap from "components/Store/StoreMap";
import StoreCatalog from "components/Store/StoreCatalog";
import StoreDescription from "components/Store/StoreDescription";
import StoreBooking from "components/Store/StoreBooking";

export default {

  name: "Store",
  components: {
    StoreBanner,
    StorePhotos,
    StoreDescription,
    StoreMap,
    StoreCatalog,
    StoreRatings,
    StoreBooking,
    Toolbar
  },

  data() {
    return {
      storeID: this.$route.params.id,
      storeData: {},
      lang: this.$i18n.locale,
      bookingDialog: false,
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
    this.fetchStoreData();
  },

  methods: {
    fetchStoreData() {
      this.$q.loading.show({ delay: 400});
      Service.getStoreData(this.storeID)
        .then(response => {
          let data = response.data["data"];
          this.storeData = data[0];
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
