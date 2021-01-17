<template>
  <div>
    <h3>{{ this.day }}</h3>
    <v-row>

      <v-col cols="10" sm="4">
        <v-menu ref="open" v-model="openingMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="openingHour" transition="scale-transition" offset-y max-width="290px" min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="openingHour" label="Hora de Abertura" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-time-picker v-if="openingMenu" v-model="openingHour" format="24hr" full-width @click:minute="$refs.open.save(openingHour)"></v-time-picker>
        </v-menu>
      </v-col>

      <v-col cols="10" sm="4">
        <v-menu ref="close" v-model="closeMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="closingHour" transition="scale-transition" offset-y max-width="290px" min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="closingHour" label="Hora de Fecho" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-time-picker v-if="closeMenu" v-model="closingHour" format="24hr" full-width @click:minute="$refs.close.save(closingHour)"></v-time-picker>
        </v-menu>
      </v-col>

      <v-col cols="10" sm="4">
        x
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Schedule",
  props: {
    _id: String,
    day: String,
    openingHour: String,
    closingHour: String
  },

  data() {
    return {
      closeMenu: false,
      openingMenu: false
    }
  }
}
</script>

<style scoped>

</style>