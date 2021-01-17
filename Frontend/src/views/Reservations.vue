<template>
  <div style="color: #434343;" class="centerDiv">
    <div class="row" style="margin: 20px; padding-top:10px;">
      <div class="col-10" style="">
        <p>
          <span style="font-weight: 670; font-size: 45px;">
            {{$t('bookingsPage.title')}}
          </span>
          <br/>
          <span style="font-weight: 300; font-size: 20px;">
            {{$t('bookingsPage.description')}}
          </span>
        </p>
      </div>
      <div class="col-2" style="padding-left: 15px; display: flex; align-items: center; justify-content: center;">
        <q-btn
          round
          class="filterAvatar"
          size="md" 
          icon="fas fa-filter"
        />
      </div>
    </div>
      <div class="title">
        {{$t('bookingsPage.type1')}}
      </div>
      <div v-if="this.reservationsCurrent.length == 0" class="subTitle">
        {{$t('bookingsPage.emptyType1')}}
      </div>
      <div v-else>
        <ReservationsList :base="base" v-for="(reservation, index) in reservationsCurrent" :key="index" v-bind="reservation"/>
      </div>
      <br/>
      <div class="title">
        {{$t('bookingsPage.type2')}}
      </div>
      <div v-if="this.reservationsConcluded.length == 0" class="subTitle">
        {{$t('bookingsPage.emptyType2')}}
      </div>
      <div v-else>
        <ReservationsList :base="base" v-for="(reservation, index) in reservationsConcluded" :key="index" v-bind="reservation"/>
      </div>
    <div>
     <Toolbar/>
    </div>
  </div>  
</template>

<script>

import Service from '../services/user.service';
import Toolbar from '../components/Root/Toolbar';
import ReservationsList from '../components/Reservations/ReservationsList.vue';

export default {

  name: "Reservations",

   data() {
    return {
      reservationsCurrent: Array,
      reservationsConcluded: Array,
      base: String
    }
  },

  components: {
    ReservationsList,
    Toolbar
  },

  mounted() {
    console.log("Mounted: View has been rendered");
    this.getReservationsCurrent();
    this.getReservationsConcluded();
  },

  methods: {
    getReservationsCurrent() {
      Service.getBookingUserCurrent()
        .then(response => {
          this.base = response.data["base"];
          this.reservationsCurrent = response.data["data"];
          console.log(this.reservationsCurrent);
        }).catch(err => {
          console.log(err)
        })
    },
    getReservationsConcluded() {
      Service.getBookingUserConcluded()
        .then(response => {
          this.reservationsConcluded = response.data["data"];
        }).catch(err => {
          console.log(err)
        })
    }
  }
}

</script>

<style scoped>

  .filterAvatar {
    font-size: 1em!important;
    color: white;
    background-color: #434343;
  }
  
  .centerDiv {
    padding: 15px;
    margin-top: 40px;
  }

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

  .roundedDiv {
    border-radius: 200px;
    background: white;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .title {
    background: linear-gradient(#e9695c, #e03459);
    color: white;
    height: 40px;
    width: 130px;
    border-radius: 100px;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px;
  }

  .subTitle {
    color: #434343;
    font-size: 20px;
    font-weight: 300;
    display: flex;
    justify-content: left;
    margin: 20px;
  }

</style>
