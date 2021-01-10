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
      <ReservationsList v-for="(reservation, index) in reservations" :key="index" v-bind="reservation"/>
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
      reservations: Array
    }
  },

  components: {
    ReservationsList,
    Toolbar
  },

  mounted() {
    console.log("Mounted: View has been rendered");
    this.getReservations();
  },

  methods: {

    getReservations() {
      Service.getBookingUser()
        .then(response => {
          let data = response.data["data"];
          this.reservations = data;
          console.log("IO");
          console.log(data);
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
    margin-top: 10px;
  }

  .gradientOne {
    background: linear-gradient(#e9695c, #e03459);
    color: white;
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

</style>
