<template>
  <div class="products">
    <h1>Products</h1>
    <div class="products-filters">
      <form @submit.prevent="filtersHandler" action="">
        <div class="products-filters__byName">
          <span>Name:</span>
          <input class="products-filters__input" v-model.trim="filters.title" type="text" placeholder="Filter by name">
        </div> |
        <div class="products-filters__byDate">
          <span>Data:</span>
          <label for="from">from</label><input name="from" class="products-filters__input" v-model.trim="filters.from" type="date" placeholder="from">
          <label for="to">to</label><input name="to" class="products-filters__input" v-model.trim="filters.to" type="date" placeholder="to">
        </div> |
        <div class="products-filters__byPrice">
          <span>Price:</span>
          <input class="products-filters__input" v-model.trim="filters.price_from" type="text" placeholder="from">
          <input class="products-filters__input" v-model.trim="filters.price_to" type="text" placeholder="to">
        </div>
        <input class="products-filters__submit main-button" type="submit" value="Filter products">
      </form>
    </div>
    <ul class="products__list">
      <template v-if="products.data.length">
        <li class="products__item" v-for="product in products.data" :key="product.id">
          <div :style="`background-image: url(${product.thumbnail})`" alt="" class="products__img"></div>
          <h2 class="products__name">{{ product.title }}</h2>
          <p class="products__description">{{ product.body }}</p>
        </li>
      </template>
      <h2 v-else class="products__noProducts">No products</h2>
    </ul>
    <paginate
      v-model="page"
      :page-count="products.last_page"
      :click-handler="paginateHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'products-pagination'"
      :page-class="'products-pagination__page'"
      :active-class="'products-pagination__page--active'">
    </paginate>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapState} from 'vuex'

import Paginate from 'vuejs-paginate'

export default {
  name: 'Home',
  data(){
    return{
      page: 1,
      filters: {
        from: '',
        to: '',
        price_from: '',
        price_to: '',
        title: '',
      }
    }
  },
  components:{
    Paginate,
  },
  computed:{
    ...mapState([
      'session',
      'products',
      'savedFilters'
    ]),
    getProdRequestData: function(){
      return {page: this.page, ...this.savedFilters}
    }
  },
  methods:{
    ...mapActions([
      'GET_PRODUCTS',
      'SAVE_FILTERS'
    ]),
    paginateHandler(){
      this.GET_PRODUCTS(this.getProdRequestData)
    },
    filtersHandler(){
      this.page = 1
      this.SAVE_FILTERS(this.filters)
      this.GET_PRODUCTS(this.getProdRequestData)
    }
  },
  mounted(){
    if(JSON.stringify(this.savedFilters) === '{}'){
      this.SAVE_FILTERS(this.filters)
      this.GET_PRODUCTS(this.getProdRequestData)
    }else{
      this.filters = this.savedFilters
      this.GET_PRODUCTS(this.getProdRequestData)
    }
  }
}
</script>

<style lang="scss">
  @import '../../node_modules/animate.css/animate.min.css';
  @import '../assets/colors.scss';

  .products{
    &__list{
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
    }
    &__noProducts{
      height: 400px;
      width: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      animation: fadeIn .4s;
    }
    &__item{
      width: 320px;

      margin: 42px;
      padding: 20px;

      box-shadow: 0 0 7px 3px $primary-opacity;
      cursor: pointer;
      text-align: start;

      animation: fadeIn .4s;
    }
    &__img{
      height: 300px;
      width: 100%;

      background-size: cover;
      background-position: center;
      background-color: $primary;
    }
    &__name{
      margin-top: 10px;
    }
    &__description{
      margin-top: 5px;
    }

    // pagination
    &-pagination{
      display: flex;
      justify-content: space-around;
      align-items: center;

      max-width: 300px;

      margin: 20px auto;

      position: relative;

      &__page{
        margin: 5px;

        border-radius: 9px;
        border: 1px solid $primary;

        a{
          min-height: 30px;
          min-width: 30px;

          padding: 2px;

          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        &--active{
          background: $green;
          color: white;

          border: 1px solid $green;
        }
      }
    }

    &-filters{
      margin: 40px auto;
      z-index: 1;

      max-width: 1400px;

      &__input{
        background-color: $primary;
        margin: 0 10px;
      }

      form{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      div{
        margin: 15px;

        display: flex;
        align-items: center;
      }
      span{
        font-weight: bold;
        margin-right: 10px;
      }
    }
  }
</style>
