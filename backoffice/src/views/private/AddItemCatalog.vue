<template>
  <v-container fluid style="height: 100vh;">
    <div class="center-content text-center">
      <img src="../../assets/Logo.png" class="logo-header"/>
      <div class="content-margins">
        <CatalogForm/>
      </div>

      <div class="content-margins" style="margin-bottom: 0;">
        <v-progress-linear :value="progress"></v-progress-linear>
      </div>
    </div>
  </v-container>
</template>

<script>
import CatalogForm from '../../components/RegisterStore/Catalog';
export default {
  name: "AddCatalogItem",
  components: {
    CatalogForm
  },
  data() {
    return {
      catalogRegistered: false,
      catalog: Object,
      progress: 0
    }
  },

  methods: {
    catalogCreated(catalog) {
      this.catalog = catalog;
      this.catalogRegistered = true;
      this.progress = 50;
    }
  }
}
</script>

<style scoped>

.logo-header {
  width: 250px
}

.home {
  background-color: #434343;
}

.content-margins {
  padding: 50px;
}
.center-content {
  border-radius: 25px;
  background-color: #fff;
  position: absolute;
  height: 80%;
  width: 80%;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  overflow: auto;
}
</style>