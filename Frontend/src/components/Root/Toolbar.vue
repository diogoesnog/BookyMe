      
<template>     
    <div>  
      <q-layout>
        <q-footer reveal >
          <q-tabs align="justify" class="bg-white text-grey-5 shadow-2" indicator-color="blue" active-color="blue" >
              <q-route-tab to="/home" exact >
                <q-icon name="fas fa-home"  style="font-size:25px" />
                <span>Home</span>
              </q-route-tab>
              <q-route-tab  to="/categories" exact >
                <q-icon name="fas fa-bookmark" style="font-size: 25px"/>
                <span>Booking</span>
              </q-route-tab >
              <q-route-tab  to="/favorites" exact  >
                <q-icon name="fas fa-heart" style ="font-size: 25px"/>
                <span>Favorites</span>
              </q-route-tab >
              <q-route-tab  to="/users/login" exact >
                <q-icon name="fas fa-user"  style="font-size: 25px"/>
                <span>Profile</span>           
              </q-route-tab >
          </q-tabs>   
        </q-footer>
      </q-layout>
   </div>
</template>

<script>

</script>

<style scoped>

</style>