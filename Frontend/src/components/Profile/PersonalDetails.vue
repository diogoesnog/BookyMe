<template>
    <div class="personalDetails">
      <div class="roundedDivTitle shadow">
        <p style="font-weight: 600; font-size: 20px; align-items: center; text-align: left; margin: 20px;" class="font-weight-bold button">
          {{ $t('profilePage.personalDetails') }}
        </p>
      </div>
      <div class="roundedDivContent shadow" style="display: grid; border-radius: 30px; font-size: 13px; text-align: left;">
        <div class="row" style="margin: 25px; padding-top: 10px;">
          <div class="col-10">
            <!-- Nome -->
            <div>
              <q-form>
                <q-input class="textInput" borderless v-model="profile.name" type="text" :disable="!editable">
                  <template v-slot:prepend>
                    <q-icon name="fas fa-user" color="grey-5" style="font-size: 18px; font-weight:350"/>
                  </template>
                </q-input>
              </q-form>
            </div>
            <!-- Nome de Utilizador -->
            <div>
              <q-form>
                <q-input class="textInput" borderless v-model="profile.username" :disable="!editable">
                  <template v-slot:prepend>
                    <span style="font-size: 30px; font-weight:350">#</span>
                  </template>
                </q-input>
              </q-form>
            </div>
            <!-- Email -->
            <div>
              <q-input class="textInput" borderless v-model="profile.email" :disable="!editable">
                <template v-slot:prepend>
                  <span style="font-size: 22px; font-weight:350">@</span>
                </template>
              </q-input>
            </div>
            <!-- Morada -->
            <div class="row">
              <q-form>
                <q-input class="textInput" borderless v-model="profile.address" type="text" :disable="!editable">
                  <template v-slot:prepend>
                    <q-icon name="place" color="grey-5" style="font-size: 22px; font-weight:350"/>
                  </template>
                </q-input>
                <div class="moreAddress">
                  <q-input class="textInput" borderless v-model="profile.zipCode" type="text" :disable="!editable"/>
                  <q-input class="textInput" borderless v-model="profile.city" type="text" :disable="!editable"/>
                </div>
              </q-form>
            </div>
          </div>
          <div class="col-2" style="text-align: right;">
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
    margin: 25px;
  }

  .roundedDivTitle {
    background: linear-gradient(#e9695c, #e03459);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 100px;
    -webkit-transform: translate(-45%, 50%);
    width: 210px;
    height: 35px;
    border-radius: 30px;
    color: white;
  }

  .roundedDivContent {
    display: flex;
    align-items: center;
  }

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.116);
  }

  .gradientBlue {
     background-image: linear-gradient(#13c1e0, #2897e3);
  }

  .textInput {
    height: 40px;
    font-size: 16px;
    font-weight: 300;
  }

  .moreAddress {
    display: inline-flex;
    margin-left: 35px;
  }

</style>