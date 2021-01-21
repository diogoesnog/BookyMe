<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
            flat
        >
          <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
              bottom
              right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"

            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
        ></v-calendar>
        <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
        >
          <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
          >
            <v-toolbar
                :color="selectedEvent.color"
                dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>

import DashboardServices from "../../service/dashboard"

export default {
  name: "Calendar",
  props : {
    idStore: String
  },
  data: () => ({
    bookings :[],
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['#2897e3', '#13c1e0', '#e03459', '#434343'],
  }),
  mounted () {
    this.$refs.calendar.checkChange(),
    this.getReservations()
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange () {


     /* const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)*/

      DashboardServices.getReservations(this.idStore)
          .then(response => {
            let events = []
            let tempBookings = response.data["data"];

            for (let i in tempBookings){
              const allDay = this.rnd(0, 3) === 0
              console.log("AllDay", allDay)

              events.push({
                name: `Booking_${i}`,
                start: new Date(tempBookings[i]["serviceDate"]),
                end: new Date(tempBookings[i]["serviceDate"]),
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                timed: true
              })
            }
            this.events = events
            console.log("Events",this.events)
          })
          .catch (err => {
            window.alert("Error!");
            console.log("OMG",err);
          })


      /*for (let i in this.bookings) {
        const allDay = this.rnd(0, 3) === 0
        console.log("AllDay", allDay)
        //const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        //const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        //console.log("First",first)
        //const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        //const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: "Booking",
          start: this.bookings[i],
          end: this.bookings[i],
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }*/

    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    getReservations (){
      DashboardServices.getReservations(this.idStore)
          .then(response => {
            let tempBookings = response.data["data"];

            for (let i in tempBookings){
              this.bookings.push(new Date(tempBookings[i]["serviceDate"]))
            }
            console.log("Bookings",this.bookings)
          })
          .catch (err => {
            window.alert("Error!");
            console.log("OMG",err);
          })
    },
    getConcludedCanceled(){
      DashboardServices.getReservationsConcludedCanceled(this.idStore)
          .then(response => {
            let tempBookings = response.data["data"];

            console.log("Concluded/Canceled", tempBookings)
            /*for (let i in tempBookings){
              this.bookings.push({
                name: "Booking",
                start: new Date(tempBookings[i]["serviceDate"])
              })

            }
            console.log("Bookings",this.bookings)*/
          })
          .catch (err => {
            window.alert("Error!");
            console.log("OMG",err);
          })
    }
  },
}
</script>