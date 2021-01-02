<template>
  <div>

  </div>
</template>

<script>
import Schedule from '../../models/Store/schedule';
// import Services from '../../service/user.service';
export default {
  name: "OpeningHours",

  data() {
    return {
      monday: new Schedule(),
      addMonday: false,

      tuesday: new Schedule(),
      addTuesday: false,

      wednesday: new Schedule(),
      addWednesday: false,

      thursday: new Schedule(),
      addThursday: false,

      friday: new Schedule(),
      addFriday: false,

      saturday: new Schedule(),
      addSaturday: false,

      sunday: new Schedule(),
      addSunday: false
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      // TODO: find a good way to handle this

    }
  }
}
</script>

<style scoped>

</style>