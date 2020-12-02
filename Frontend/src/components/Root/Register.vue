<template>
  <div>
    <h1>{{ $t('authPage.register') }}</h1>
    <q-form>
      <q-input :label="$t('authPage.fullName')" v-model="user.name" type="text"></q-input>
      <q-input :label="$t('authPage.username')" v-model="user.username" type="text"></q-input>
      <q-input :label="$t('authPage.emailAddress')" v-model="user.email" type="text"></q-input>
      <q-input :label="$t('authPage.address')" v-model="user.address" type="text"></q-input>
      <q-input :label="$t('authPage.city')" v-model="user.city" type="text"></q-input>
      <q-input :label="$t('authPage.zipCode')" v-model="user.zipCode" type="text"></q-input>
      <q-input :label="$t('authPage.password')" v-model="user.password" type="password"></q-input>
      <br/>
      <q-btn push color="primary" @click="handleRegister" style="width: 100%">
        {{ $t('authPage.register') }}
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
