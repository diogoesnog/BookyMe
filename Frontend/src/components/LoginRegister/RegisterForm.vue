<template>
  <div class="text-center" style="color: #434343">
    <br>
    <br>
    <div style="position: relative; top: -30px;">
      <h4 style="font-weight: 950">{{ $t('registerPage.title') }}</h4>
      <div style="position: relative; top: -35px; width: 80%; margin: auto;">
        <p v-html="$t('registerPage.description')"></p>
      </div>
    </div>  
    <q-form style="position: relative; top: -60px;">

      <div class="row" style="padding: 5px">

        <!-- Primeira Linha Tabela (Nome Completo e Username) -->
        <div class="col-6" style="padding: 10px">
          <q-input class="shadow" rounded outlined :label="$t('registerPage.fullName')" v-model="user.name" type="text" color="#2897e3">
            <template v-slot:prepend>
              <q-icon name="fas fa-user" color="grey-5" style="font-size: 20px"/>
            </template>
          </q-input>
        </div>
        <div class="col-6" style="padding: 10px">
          <q-input class="shadow" rounded outlined :label="$t('registerPage.username')" v-model="user.username" type="text" color="#2897e3">
            <template v-slot:prepend>
              <q-icon name="fas fa-hashtag" color="grey-5" style="font-size: 20px"/>
            </template>
          </q-input>
        </div>     

        <!-- Segunda Linha Tabela (Email) -->
        <div class="col-12" style="padding: 10px">
          <q-input class="shadow" rounded outlined :label="$t('registerPage.email')" v-model="user.email" type="text" color="#2897e3">
            <template v-slot:prepend>
              <q-icon name="fas fa-at" color="grey-5" style="font-size: 20px"/>
            </template>
          </q-input>
        </div>

        <!-- Terceira Linha Tabela (Morada) -->
        <div class="col-12" style="padding: 10px">
          <q-input class="shadow" rounded outlined :label="$t('registerPage.address')" v-model="user.address" type="text" color="#2897e3">
            <template v-slot:prepend>
              <q-icon name="fas fa-home" color="grey-5" style="font-size: 20px"/>
            </template>
          </q-input>
        </div>

        <!-- Quarta Linha Tabela (Cidade e Código Postal) -->
        <div class="col-6" style="padding: 10px">
          <q-input class="shadow" rounded outlined :label="$t('registerPage.city')" v-model="user.city" type="text" color="#2897e3">
            <template v-slot:prepend>
              <q-icon name="fas fa-home" color="grey-5" style="font-size: 20px"/>
            </template>
          </q-input>
        </div>
        <div class="col-6" style="padding: 10px">
          <q-input class="shadow" rounded outlined :label="$t('registerPage.postalCode')" v-model="user.zipCode" type="text" color="#2897e3">
            <template v-slot:prepend>
              <q-icon name="fas fa-home" color="grey-5" style="font-size: 20px"/>
            </template>
          </q-input>
        </div>

        <!-- Quinta Linha Tabela (Password e Confirmar Password) -->
        <div class="col-6" style="padding: 10px">
          <q-input class="shadow" rounded outlined :label="$t('registerPage.password')"  v-model="confirmpassword"  :type="isPwd ? 'password' : 'text'" color="#2897e3">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
            </template>
          </q-input>
        </div>
        <div class="col-6" style="padding: 10px">
          <q-input class="shadow" rounded outlined :label="$t('registerPage.confirmPassword')" v-model="user.password" type="password" color="#2897e3" :rules="[val=> val == confirmpassword ]">
            <template v-slot:prepend>
              <q-icon name="fas fa-lock" color="grey-5" style="font-size: 20px"/>
            </template>
          </q-input>
        </div>
       
        <!-- Sexta Linha Tabela (Botão Criar Conta) -->
        <div class="col-12" style="margin-left: auto; margin-right: auto; padding: 10px;">
          <q-btn size="17px" class="shadow gradientBlue button" rounded @click="handleRegister">
            {{ $t('registerPage.registerAccount') }}
          </q-btn>
        </div>
      
      </div>

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
      isPwd: true,
      confirmpassword: '',
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
            message: `Regist Successful.`
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

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

  .gradientBlue {
    background-image: linear-gradient(#13c1e0, #2897e3);
  }

  .button {
    margin: 15px;
    padding: 5px;
    color: #fff;
    width: 60%;
  }

</style>