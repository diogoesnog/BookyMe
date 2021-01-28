<template>
  <div>
    <div class="divTop1">
    </div>
    <div class="divTop2">
      <div class="row" style="position: relative; display: grid; justify-content: center; top: 20px">
        <div class="col-12">
          <q-avatar class="shadow" size="140px" font-size="52px" color="teal" text-color="white" >
            <img style="object-fit: cover;" :src="`${base}${profile.avatar}`">
          </q-avatar>
        </div>
        <div class="col-12" style="text-align: center">
          <span style="font-weight: 600; font-size: 30px;">
            {{ profile.name }}
          </span>
          <br/>
          <span style="font-weight: 300; font-size: 20px; line-height: 10px;">
            {{ profile.username }}
          </span>
        </div>
      </div>  
    </div>
<!--         <div class="changePhoto">
      <label class="cameraButtom" for="avatar">
        <q-icon size="23px" name="fas fa-camera" color="white"/>    
      </label>
      <input id="avatar" style="visibility:hidden;" type="file" @change="changeAvatar">
    </div> -->        
  </div>
</template>

<script>

export default {

  name: "InfoUser",

  props: {
    base: String,
    profile: Object
  },

  methods: {
    changeAvatar(e) {
      e.preventDefault();
      console.log(e.target.files[0]);
      if(e.target.files.length === 1) {
          let file = e.target.files[0];
          // event.target.files
          UserService.uploadAvatar(file)
            .then(response => {
              console.log(response);
              this.profile.avatar = response.data[ "data" ].data.avatar;

              console.log(data);
            }).catch(err => console.log(err));
      } else {console.log("Selecione exatamente um ficheiro!")}        
    },
  }
}

</script>

<style scoped>

  .divTop1{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background-size: cover;
    background-position: center top;
    background-image: url('../../assets/Other/ProfileFrame.svg');
  }

  .divTop2{
    position: relative;
    left: 0;
    top: 30px;
    width: 100%;
    height: 250px;
    color: white;
  }

  .cameraButtom{
    background: linear-gradient(#e9695c, #e03459);
    padding: 9px 9px;
    border-radius: 50px;
    border: 1px solid #e9695c;
    display: inline-block;
    outline: none;
  }

  .changePhoto {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 100px;
    -webkit-transform: translate(-50%, 50%);
    width: 200px;
    height: 35px;
  }

</style>