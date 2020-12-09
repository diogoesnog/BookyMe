<template>
  <div>
    <br>
    <h4  class="text-center" style="font-weight: bold;">{{ $t('registerPage.title') }}</h4>
    <p class="text-center" v-html="$t('registerPage.description')"></p>
    <q-form>
      <div class="row">
        <div class="col-6">
          <q-input rounded outlined :label="$t('registerPage.fullName')" v-model="user.name" type="text" style="width: 90%;" >
            <template v-slot:prepend>
              <q-icon name="fas fa-user"  color="grey-5" />
            </template>
          </q-input>
        </div>
        <br>
        <div class="col-6">
          <q-input rounded outlined :label="$t('registerPage.username')" v-model="user.username" type="text" style="width: 90%;">
            <template v-slot:prepend>
              <q-icon name="fas fa-hashtag" color="grey-5" />
            </template>
          </q-input>
          <br>
        </div>
        <div class="col-12">
          <q-input  rounded outlined :label="$t('registerPage.email')" v-model="user.email" type="text" style="width: 95%;" color="light-blue-7" >
            <template v-slot:prepend>
              <q-icon name="fas fa-at" color="grey-5"/>
            </template>
          </q-input>
          <br>
        </div>
          <div class="col-12">
            <q-input  rounded outlined :label="$t('registerPage.address')" v-model="user.address" type="text" style="width: 95%;" color="light-blue-7" >
              <template v-slot:prepend>
                <q-icon name="fas fa-home" color="grey-5" />
              </template>
              <br>
            </q-input>
            <br>
          </div>
        <div class="col-6">
          <q-input  rounded outlined :label="$t('registerPage.city')" v-model="user.city" type="text" style="width: 90%;" color="light-blue-7" >
            <template v-slot:prepend>
              <q-icon name="fas fa-home" color="grey-5" />
            </template>
          </q-input>
          <br>
        </div>
        <div class="col-6">
          <q-input  rounded outlined :label="$t('registerPage.postalCode')" v-model="user.zipCode" type="text" style="width: 90%;" color="light-blue-7" >
            <template v-slot:prepend>
              <q-icon name="fas fa-home" color="grey-5" />
            </template>
          </q-input>
        </div>
        <div class="col-6">
          <q-input  rounded outlined :label="$t('registerPage.password')" v-model="user.password" type="password" style="width: 90%;" color="light-blue-7" >
            <template v-slot:prepend>
              <q-icon name="fas fa-lock"  color="grey-5"/>
            </template>
          </q-input>
        </div>
        <div class="col-6">
          <q-input  rounded outlined :label="$t('registerPage.confirmPassword')" v-model="user.password" type="confirmpassword" style="width: 90%;" color="light-blue-7" >
            <template v-slot:prepend  class="shadow-2">
              <q-icon name="fas fa-lock" color="grey-5" />
            </template>
          </q-input>
          <br>
        </div>
      </div>
    <q-row> 
            <q-col class="window-width row justify-center items-center" >
              <q-btn  rounded standout push color="light-blue-7" @click="handleRegister" style="min-width: 120px" >
                {{ $t('registerPage.registerAccount') }}
              </q-btn>
            </q-col>
          </q-row>
    </q-form>
    
  </div>
</template>

<script>
import User from '../../models/User';
import Service from '../../services/user.service';

export default {
  name: "Register",
  data() {
    return {
      user: new User()
    }
  },
  methods: {
    handleRegister (e) {
      e.preventDefault();
      console.group("UserRegistration");
      Service.registerUser(this.user)
        .then(response => {
          let data = response.data;
          console.log("Sucess");
          this.$q.notify({
            type: 'positive',
            message: `Regist Successful. New user created with id ${data.data._id}`
          });
        })
        .catch(err => {
          console.log(`Error ${err}`);
          this.$q.notify({
            type: 'negative',
            message: 'Failed to Regist'
          });
        })
      console.groupEnd();
    }
  }
}
</script>

<style scoped> 

</style>
