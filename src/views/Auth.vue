<template>
  <div class="auth">
    <div class="auth__form">
        <h1>Authorization</h1>
        <form @submit.prevent="logInHandler">
          <input v-model.trim="email" type="text" name="email" class="auth__input" :class="{'auth__input--invalid': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" placeholder="email">
          <span class="auth__error">{{ ($v.email.$dirty && !$v.email.required) ? "Pleace enter your email" : ($v.email.$dirty && !$v.email.email) ? "Email is incorect" : "" }}</span>

          <input v-model.trim="password" type="password" name="password" class="auth__input" :class="{'auth__input--invalid': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" placeholder="password">
          <span class="auth__error">{{ ($v.password.$dirty && !$v.password.required) ? "Pleace enter your password" : ($v.password.$dirty && !$v.password.minLength) ? `Password must be at least ${$v.password.$params.minLength.min} characters. Now ${password.length}` : "" }}</span>

          <input type="submit" class="main-button auth__submit" value="LogIn"> 
        </form>
    </div>
  </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import {mapActions} from 'vuex'
import {mapState} from 'vuex'

export default {
  name: 'Auth',
  data(){
    return{
      email: '',
      password: '',
    }
  },
  validations:{
    email: {email, required},
    password: {required, minLength: minLength(8)}
  },
  computed:{
    ...mapState([
      'session',
    ])
  },
  methods:{
    ...mapActions([
      'LOG_IN',
    ]),
    logInHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }

      const data = {
        email: this.email,
        password: this.password
      }

      this.LOG_IN(data)
      .then(() => {
        this.$router.push('/products')
      })
      .catch(() => {
        this.$parent.showErrorAlert()
      })
    },
  }
}
</script>

<style lang="scss">
@import '../assets/colors.scss';

.auth{
  &__form{
    width: 300px;

    form{
      margin-top: 10px;

      display: flex;
      flex-flow: column;
    }
  }
  &__input{
    border: 1px solid $primary;
    border-radius: 7px;

    margin: 7px auto 0 auto;

    width: 100%;

    &--invalid{
      border: 1px solid $error;
    }
    &:focus{
      border: 1px solid $primary;
    }
  }
  &__submit{
    margin: 0 auto;
  }


  &__error{
    min-height: 18px;
    color: $error;

    text-align: start;
    font-size: 14px;

    padding-left: 4px;
  }
}
</style>
