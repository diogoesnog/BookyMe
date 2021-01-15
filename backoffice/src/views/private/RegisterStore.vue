<template>
  <div>
    <StoreForm v-if="!storeRegistered" @storeCreated="storeCreated"/>
    <Schedule v-else/>
  </div>
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
      store: Object
    }
  },

  methods: {
    storeCreated(store) {
      this.store = store;
      this.storeRegistered = true;
    }
  }
}
</script> 

<style scoped>

</style>