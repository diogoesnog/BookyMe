<template>
  <div>
    <h3>{{ this.workday.day }}</h3>

    <v-row>


      <v-col cols="11" sm="5">
        <v-menu ref="open" v-model="openingMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="workday.openingHour" transition="scale-transition" offset-y max-width="290px" min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="workday.openingHour" label="Hora de Abertura" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-time-picker v-if="openingMenu" v-model="workday.openingHour" format="24hr" full-width @click:minute="$refs.open.save(workday.openingHour)"></v-time-picker>
        </v-menu>
      </v-col>

      <v-col cols="11" sm="5">
        <v-menu ref="close" v-model="closeMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="workday.closingHour" transition="scale-transition" offset-y max-width="290px" min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="workday.closingHour" label="Hora de Fecho" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-time-picker v-if="closeMenu" v-model="workday.closingHour" format="24hr" full-width @click:minute="$refs.close.save(workday.closingHour)"></v-time-picker>
        </v-menu>
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
  name: "OpeningHours",

  props: {
    workday: Object
  },

  data() {
    return {
      openingMenu: false,
      closeMenu: false
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