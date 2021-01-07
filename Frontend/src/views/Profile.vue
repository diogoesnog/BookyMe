<template>
  <div style="color: #434343;" class="centerDiv">
      <div class="q-pa-md q-gutter-sm">
          <q-avatar size="100px" font-size="52px" color="teal" text-color="white" style="text-align: center;">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
      </div>
      <div>
          <Toolbar/>
      </div>
  </div> 
</template>

<script>

import Service from '../services/user.service';
import Toolbar from '../components/Root/Toolbar';

export default {

  name: "Profile",
  components: { Toolbar },

}

</script>

<style scoped>

  .gradientOne {
    margin-left: 10px;
    margin-top: 0px;
    position: relative;
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
