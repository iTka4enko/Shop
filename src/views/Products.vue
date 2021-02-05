<template>
  <div class="products">
    <h1>Products</h1>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapState} from 'vuex'

export default {
  name: 'Home',
  computed:{
    ...mapState([
      'authUser',
      'products'
    ])
  },
  methods:{
    ...mapActions([
      'GET_PRODUCTS'
    ])
  },
  created(){
    this.GET_PRODUCTS()
  }
}
</script>
