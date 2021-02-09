<template>
  <div class="app__wrapper">
    <error-alert v-if="errorShow" errorText="Internal server error. Please try later"></error-alert>
    <div class="nav">
      <template v-if="session.user">
        <router-link to="/products">Products</router-link> |
      </template>
      <router-link to="/auth">Auth</router-link>
    </div>
    <div class="container">
      <router-view/>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import ErrorAlert from './components/ErrorAlert.vue'

export default {
  data(){
    return{
      errorShow: false
    }
  },
  components:{
    ErrorAlert
  },
  computed:{
    ...mapState([
      'session'
    ])
  },
  methods:{
    showErrorAlert(){
      let v = this
      v.errorShow = true
        setTimeout(function(){
          v.errorShow = false
        }, 1000)
    },
  }
}
</script>

<style lang="scss">
@import './assets/colors.scss';
@import './assets/styles/defaults.scss';

.app__wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $main-text;

  display: flex;
  flex-flow: column;
  min-height: 100vh;
}

.nav {
  padding: 30px;
  background-color: $primary;

  min-width: 100vw;

  a {
    font-weight: bold;
    color: $main-text;
    
    margin: 0;
    padding: 0;

    &.router-link-exact-active {
      color: $green;
    }
  }
}

.container{
  width: 100%;
	max-width: 1600px;
	margin: 0 auto;
  padding: 30px;

	position: relative;

  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;
}

footer{
  height: 70px;
  background-color: $primary;
}

.main-button{
    background-color: $green;
    border-radius: 12px;

    color: white;

    width: 150px;

    cursor: pointer;

    &:hover{
      background-color: darken($green, 4%);
    }
    &:active{
      background-color: darken($green, 10%);
    }
  }
</style>
