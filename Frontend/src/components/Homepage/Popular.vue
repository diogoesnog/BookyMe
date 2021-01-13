<template>
  <div class="text-center" style="color: #434343">
    <div class="divTop1">
         <div class="divTop2">
           <div class="row">
            <div class="col-9">
              <span style="font-weight: 600; font-size: 35px;">
                {{ $t('homePage.greeting') }}, {{profile.name}}
              </span>
            </div>
            <div class="col-3">
              <q-avatar class="shadow gradientOne">
                <img style="object-fit: cover;" :src="getImage()">
              </q-avatar>
            </div>
          </div>
        </div> 
    </div>
</div> 

</template>

<script>

import Service from '../../services/auth.service'
import User from '../../models/User';

export default {
  name: "Popular",

  props: {
    profile: Object,
    base: String
  }, 

  data() {
    return {
    }
  },

  components: {
  },

  methods: {
    getImage(url) {
      return this.base + this.profile.avatar;
    },
  }
}


</script>

<style scoped>

  .divTop1{
    position: fixed;
    top: -25px;
    left: 0;
    width: 100%;
    height: 50%;
    background-size: cover;
    background-position: center top;
    background-image: url('../../assets/Other/ProfileFrame.svg');
  }

  .divTop2{
    position: fixed;
    left: 0;
    top: 30px;
    width: 100%;
    color: white;
  }

  .divBottom {
    z-index: 1000;
    position: fixed;
    bottom: 35px;
    width: 100%;
    padding: 30px;
  }

</style>
