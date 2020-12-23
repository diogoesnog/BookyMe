<template>
  <div>
    <StoreForm v-if="!storeRegistered"/>
    <Schedule v-else/>
  </div>
</template>

<script>
import Store from '../models/Store/store'
import StoreForm from '../components/RegisterStore/General';
import Schedule from '../components/RegisterStore/Schedule';
export default {
  name: "RegisterStore",
  components: {
    StoreForm, Schedule
  },
  data() {
    return {
      storeRegistered: false,
      store: new Store()
    }
  }
}
</script>

<style scoped>

</style>