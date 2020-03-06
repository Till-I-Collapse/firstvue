<template>
  <div>
    <cart-list-item v-for="(item,index) in cartList" :key='index' :itemInfo="item"/>
  </div>
</template>

<script>
import cartListItem from './cartListItem'

import {mapGetters} from 'vuex'
export default {
  components:{
    cartListItem,
  },
  computed:{
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>

</style>