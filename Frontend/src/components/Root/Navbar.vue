      
<template>     
    <div class="q-pa-md" >  
      <q-layout >
        <q-footer reveal elevated >
                <q-tabs v-model="tab" align="justify" class="bg-white text-grey-5 shadow-2" indicator-color="blue" active-color= "blue" >
                    <q-tab flat @click="HomePage" >
                        <q-icon name="fas fa-home"  style="font-size:25px" />
                    </q-tab>
                    <q-tab flat @click="Booking" >
                        <q-icon name="fas fa-bookmark" style="font-size: 25px"/>
                    </q-tab>
                    <q-tab flat @click="Favorites"  >
                        <q-icon name="fas fa-heart" style ="font-size: 25px"/>
                    </q-tab>
                    <q-tab flat @click="User" >
                        <q-icon name="fas fa-user"  style="font-size: 25px"/>
                    </q-tab>
                </q-tabs>   
        </q-footer>
      </q-layout>
   </div>
</template>

<script>
import User from '../../models/User';
import Favorites from '../../models/User';
import Service from '../../services/user.service';

export default {
  name: "Register",
  

  methods: {
   handleHomePage(e){},
   handleBooking(e){},
   handleFavorites(e){},
   handleUser(e){}
  }
}
</script>

<style scoped>

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

  .divMajor {
    position: fixed;
    left: 0px;
    width: 100%;
    padding-bottom: 800px;
    background-image: linear-gradient(#13c1e0, #2897e3);
  }

  .divTop{
    top: 70px;
    position: relative;
  }

  .divBottom1{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 100px;
    height: 505px;
    background-size: cover;
    background-position: center top;
    background-image: url('../../assets/Other/LoginFrame.svg');
  }

  .divBottom2{
    position: fixed;
    bottom: 40px;
    left: 0;
    width: 100%;
    padding: 60px;
  }

  .button {
    font: bold 12px;
    margin: 0px;
    padding: 10px;
    color: #fff;
  }

  .inputWhite {
      background: white;
  }

  .gradientRed {
      background-image: linear-gradient(#e9695c, #e03459);
  }

  .gradientBlue {
    color: linear-gradient(#13c1e0, #2897e3);
  }

</style>