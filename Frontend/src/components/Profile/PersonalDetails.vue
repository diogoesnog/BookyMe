<template>
    <div class="personalDetails">
      <div class="roundedDivTitle shadow">
        <p style="font-weight: 500; font-size: 130%; align-items: center; text-align: left; margin: 20px;" class="font-weight-bold button">
          {{ $t('profilePage.personalDetails') }}
        </p>
      </div>
      <div class="roundedDivContent shadow" style="display: grid; border-radius: 30px; font-weight: 280; font-size: 13px; text-align: left;">
        <div class="row" style="margin: 10px; padding-top: 25px; padding-bottom: 10px;">
          <div class="col-10">
            <!-- Nome -->
            <div>
                <q-form  class="q-gutter-md">
                  <q-input borderless v-model="profile.name"  style="height: 30px;" type="text" :disable="!editable">
                    <template v-slot:prepend>
                      <q-icon name="fas fa-user" color="grey-5" style="font-size: 20px; font-weight:350"/>
                    </template>
                  </q-input>
                </q-form>
            </div>
            <!-- Nome de Utilizador -->
            <div>
              <q-form class="q-gutter-md">
                <q-input borderless v-model="profile.username" style="height: 30px;" :disable="!editable">
                  <template v-slot:prepend>
                    <span style="font-size: 28px; font-weight:350">#</span>
                  </template>
                </q-input>
              </q-form>
            </div>
            <!-- Email -->
            <div>
              <q-input borderless v-model="profile.email" style="height: 30px;" :disable="!editable">
                <template v-slot:prepend>
                  <span style="font-size: 20px; font-weight:350">@</span>
                </template>
              </q-input>
            </div>
            <!-- Morada -->
            <div class="row">
              <div class="col-1" style="display: flex; justify-content: left; align-items: center;">
                <q-icon name="fas fa-home" color="grey-5" style="font-size: 20px; "/>
              </div>
              <div class="col-11">
                <q-input borderless v-model="profile.address" style="height: 30px;" :disable="!editable"/>
                <div class="row" style="margin-top: -10px;">
                  <div class="col-4">
                    <q-input borderless v-model="profile.zipCode" style="height: 30px;" :disable="!editable"/> 
                  </div>
                  <div class="col-8">
                    <q-input borderless v-model="profile.city" style="height: 30px;" :disable="!editable"/>
                  </div>  
                </div>
              </div>
            </div>
          </div>
          <div class="col-2">
            <!-- Botões -->
            <q-btn size="sm" class="gradientBlue" round @click="buttonEdit" v-show="!hide">
              <q-icon name="fas fa-pen" color="white"/>
            </q-btn>
            <q-btn size="sm" class="gradientBlue" round @click="bottomSave" v-show="hide">
              <q-icon name="fas fa-save" color="white"/>
            </q-btn>
            <q-btn size="sm" class="gradientBlue" round @click="bottomCancel" v-show="hide" style="margin-top: 5px">
              <q-icon name="fas fa-times" color="white"/>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  
  name: "PersonalDetails",

  props: {
    profile: Object
  },

  data() {
    return {
      editable: false,
      hide: false
    }
  },

  methods: {

    buttonEdit(){
      this.editable = true;
      this.hide = true;
    },
    bottomSave(e){
      e.preventDefault();
      this.$emit('changeUserProfile', this.profile);
      this.editable = false;
      this.hide = false;
    },
    bottomCancel(){
      this.editable = false;
      this.hide = false;
    },  
  }
}

</script>

<style scoped>

  .personalDetails {
    position: relative;
    padding-top: 50px;
    margin: 25px;
  }

  .roundedDivTitle {
    background: linear-gradient(#e9695c, #e03459);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 100px;
    -webkit-transform: translate(-50%, 50%);
    width: 200px;
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