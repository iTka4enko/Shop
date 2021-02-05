<template>
  <div class="app__wrapper">
    <div id="nav">
      <template v-if="authUser">
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

export default {
  computed:{
    ...mapState([
      'authUser'
    ])
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

#nav {
  padding: 30px;
  background-color: $primary;

  a {
    font-weight: bold;
    color: $main-text;

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
</style>
