<template>
  <v-container fluid style="height: 100vh;" class="home">
    <div class="center-content text-center">
      <img src="../../assets/Logo.png" class="logo-header"/>
      <div class="content-margins">
        <StoreForm v-if="storeRegistered" @storeCreated="storeCreated"/>
        <Schedule v-else/>
      </div>

      <div class="content-margins" style="margin-bottom: 0;">
        <v-progress-linear :value="progress"></v-progress-linear>
      </div>
    </div>
  </v-container>
</template>
<script>
import StoreForm from '../../components/RegisterStore/General';
import Schedule from '../../components/RegisterStore/Schedule';
export default {
  name: "RegisterStore",
  components: {
    StoreForm, Schedule
  },
  data() {
    return {
      storeRegistered: false,
      store: Object,
      progress: 0
    }
  },

  methods: {
    storeCreated(store) {
      this.store = store;
      this.storeRegistered = true;
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