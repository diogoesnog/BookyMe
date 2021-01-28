<template>
  <div class="security">
    <div class="roundedDivTitle shadow">
      <p style="font-weight: 600; font-size: 20px; align-items: center; text-align: left; margin: 20px;" class="font-weight-bold button">
        {{ $t('profilePage.security') }}
      </p>
    </div>
    <div class="roundedDivContent shadow" style="display: grid; border-radius: 30px; font-weight: 300; font-size: 16px; text-align: left;">
      <div class="row" style="margin: 10px; padding-top: 10px">
        <div class="col-10">  
          <div style="margin-top:7px">
            <q-form>
              <div class="row" style="padding: 5px">
                <div class="col-6" style="padding: 10px; ">
                  <q-input borderless v-model="oldPassword" :label="$t('profilePage.oldPassword')" style="height: 30px; font-size: 20px" :type="isPwd ? 'password' : 'text'" :disable="!editable">
                    <template v-slot:append>
                      <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
                    </template>
                  </q-input>
                </div>
                  <div class="col-6" style="padding: 10px">
                    <q-input borderless v-model="newPassword" :label="$t('profilePage.newPassword')" style="height: 30px; font-size: 20px" :type="isPwd ? 'password' : 'text'" :disable="!editable">
                      <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
                      </template>
                    </q-input>
                  </div>
              </div>
            </q-form>
          </div>
        </div>
        <div class="col-2" style="padding: 10px">
          <div>
            <q-btn flat size="sm" class="gradientBlue" round @click="buttonEdit" v-show="!hide" >
              <q-icon name="fas fa-pen" color="white"/>
            </q-btn>
          </div>
          <div>
            <q-btn flat size="sm" class="gradientBlue" @click="bottomSavePassword" round v-show="hide">
              <q-icon name="fas fa-save" color="white"/>
            </q-btn>
          </div>
          <div>
            <q-btn flat size="sm" class="gradientBlue" @click="bottomCancel2" round v-show="hide" style="margin-top: 5px">
              <q-icon name="fas fa-times" color="white"/>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
 
  name: "Security",

  props: {
    profile: Object
  },

  data() {
    return {
      isPwd: true,
      editable: false,
      hide: false,
      newPassword: "*****",
      oldPassword: "*****"
    }
  },

  methods: {
    buttonEdit(){
      this.editable = true;
      this.hide = true;
      this.newPassword = "";
      this.oldPassword = "";
    },
    bottomCancel2(){
      this.editable = false;
      this.hide = false;
      this.newPassword = "*****";
      this.oldPassword = "*****";
    },
    bottomSavePassword(e){
      e.preventDefault();
      let data ={
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
        }
      this.$emit('changeUserPassword', data);
      this.editable = false;
      this.hide = false;
      
    }, 
  }

}

</script>

<style scoped>

  .security {
    position: relative;
    margin: 25px;
  }

  .roundedDivTitle {
    background: linear-gradient(#e9695c, #e03459);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 100px;
    -webkit-transform: translate(-65%, 50%);
    width: 150px;
    height: 35px;
    border-radius: 30px;
    color: white;
  }

  .roundedDivContent {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.116);
  }

  .gradientBlue {
     background-image: linear-gradient(#13c1e0, #2897e3);
  }

</style>