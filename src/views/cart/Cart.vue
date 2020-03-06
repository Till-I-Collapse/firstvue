<template>
  <div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
    <scroll class='content'
            ref="scroll">
      <!-- <li v-for="item in cartList">{{item}}</li> -->
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import cartList from './childComps/cartList'
import cartBottomBar from './childComps/cartBottomBar'
import Scroll from 'components/common/scroll/Scroll'

import {mapGetters} from 'vuex'
export default {
  components:{
    NavBar,
    cartList,
    cartBottomBar,
    Scroll
  },
  props:{},
  activated(){
    this.$refs.scroll.refresh()
  },
  computed:{
    ...mapGetters(['cartCount'])
  },
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style scoped>
  #cart{
    height: 100vh;
    position: relative;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
  }
</style>