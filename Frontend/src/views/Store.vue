<template>
  <div >
    <div class="centerDiv" >
      <!-- <div class="row">
        <div class="col-4">
          <q-select
            class="selectLanguage"
            rounded
            outlined
            v-model="lang"
            :options="langOptions"
            :label="$t('settingsPage.language')">
          </q-select>
        </div>
      </div>-->

    </div>
    <div>
      <StoreData v-bind="storeData"/>
    </div>
    <div>
      <Toolbar/>
    </div>
  </div>

</template>

<script>

import Toolbar from '../components/Root/Toolbar';
import StoreData from '../components/Store/StoreData';
import Service from '../services/user.service'


export default {

  name: "Store",
  components: {
    StoreData,
    Toolbar
  },

  data() {
    return {
      storeID: this.$route.params.id,
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
    this.fetchStoreData();
  },

  methods: {

    fetchStoreData() {
      this.$q.loading.show({ delay: 400});

      // TODO: Fazer para o estabelecimento a ligação
      Service.getStoreData(this.storeID)
        .then(response => {
          let data = response.data["data"];
          this.storeData=data[0];
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

.centerDiv {
  padding: 5px;
  margin-top: 5px;
}

</style>
