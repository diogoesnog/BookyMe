<template>
  <div class="text-center" style="color: #434343">

    <div class="divTop1">
         <div class="divTop2">
         </div> 
    </div> 
    <div class="divBottom">
            
     </div> 
  </div> 

</template>

<script>




export default {
  name: "Popular",

  data() {
    return {
    }
  },

  components: {
    
  },

  methods: {
  }
}


</script>

<style scoped>

.divTop1{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
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
