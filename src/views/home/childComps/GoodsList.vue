<template>
  <div class="goods-list"> 
    <goods-list-item v-for="item in goods" :goods="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
    }
  },
  computed:{},
  methods:{}
}
</script>
<style scoped>
  .goods-list{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
  }
</style>