<template>
  <div>
    <v-form>
      <v-row>
        <v-col cols="10">
          <v-text-field>
          </v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
            cols="11"
            sm="5"
        >
        </v-col>
        <v-col cols="2">
          <v-checkbox
              v-model="addMonday"
              label="Monday"
              color="primary"
              value="primary"
              hide-details
          ></v-checkbox>
        </v-col>
      </v-row>

    </v-form>
  </div>
</template>

<script>
import Schedule from '../../models/Store/schedule';
// import Services from '../../service/user.service';
export default {
  name: "OpeningHours",

  data() {
    return {
      monday: new Schedule("Segunda-feira"),
      addMonday: false,
      mondayMenu: false,

      tuesday: new Schedule("Terça-feira"),
      addTuesday: false,

      wednesday: new Schedule("Quarta-feira"),
      addWednesday: false,

      thursday: new Schedule("Quinta-feira"),
      addThursday: false,

      friday: new Schedule("Sexta-feira"),
      addFriday: false,

      saturday: new Schedule("Sábado"),
      addSaturday: false,

      sunday: new Schedule("Domingo"),
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