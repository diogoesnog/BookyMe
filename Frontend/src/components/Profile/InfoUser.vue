<template>
  <div>
    <div class="divTop1">
    </div>
    <div class="divTop2">
      <div class="row gridPhotoInfo">
        <div class="col-12 photo">
          <q-avatar class="shadow" size="160px" font-size="55px" color="teal" text-color="white" >
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
    <div class="changePhoto">
      <label class="cameraButtom" for="avatar">
        <q-icon size="25px" name="fas fa-camera" color="white"/>    
      </label>
      <input id="avatar" style="visibility:hidden;" type="file" @change="changeAvatar">
    </div>
    <div class="space"/>     
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
    width: 100%;
    height: 70%;
    background-size: cover;
    background-position: center top;
    background-image: url('../../assets/Other/ProfileFrame.svg');
  }

  .divTop2{
    position: relative;
    left: 0;
    top: 40px;
    width: 100%;
    height: 250px;
    color: white;
  }

  .cameraButtom{
    background: linear-gradient(#e9695c, #e03459);
    padding: 12px 12px;
    border-radius: 50px;
    display: inline-block;
    align-self: center;
    justify-self: center;
  }

  .changePhoto {
    position: relative;
    display: grid;
    align-items: center;
    top: -100px;
    left: 55px;
  }

  .photo {
    display: flex;
    justify-content: center;
  }

  .gridPhotoInfo {
    position: relative; 
    display: grid; 
    justify-content: center; 
    grid-gap: 20px;
  }

  .space {
    position: relative;
    height: 10px;
  }

</style>