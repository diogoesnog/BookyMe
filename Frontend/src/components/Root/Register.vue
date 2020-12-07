<template>
  <div>
    <h4  class="text-center" >{{ $t('registerPage.title') }}</h4>
    <p class="text-center" v-html="$t('registerPage.description')"></p>
    <q-form>
      <q-input rounded outlined :label="$t('registerPage.fullName')" v-model="user.name" type="text" style="width: 35%;"></q-input>
      <q-input  rounded outlined :label="$t('registerPage.username')" v-model="user.username" type="text" style="width: 35%;"></q-input>
      <q-input  rounded outlined :label="$t('registerPage.email')" v-model="user.email" type="text"></q-input>
      <q-input  rounded outlined :label="$t('registerPage.address')" v-model="user.address" type="text"></q-input>
      <q-input  rounded outlined :label="$t('registerPage.city')" v-model="user.city" type="text"></q-input>
      <q-input  rounded outlined :label="$t('registerPage.postalCode')" v-model="user.zipCode" type="text"></q-input>
      <q-input  rounded outlined :label="$t('registerPage.password')" v-model="user.password" type="password"></q-input>
      <br/>
      <q-btn class="absolute-center" rounded standout push color="light-blue-7" @click="handleRegister" style="width: 35%; margin-top:53%" >
        {{ $t('registerPage.registerAccount') }}
      </q-btn>
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
