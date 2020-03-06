<template>
  <div>
    <div :key="index"
    v-for="(item,index) in categories"
    @click="itemClick(index)"
    class='menu-list-item'
    :class="{active: index===currentIndex}">
      {{item.title}}
    </div>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  components:{
    Scroll
  },
  data(){
    return{
      currentIndex:0
    }
  },
  props:{
    categories:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('selectItem', index)
    }
  }
}
</script>

<style scoped>
.content{
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
  /* top:0px;
  bottom: 49px;
  position: absolute;
  overflow: hidden;   */
}

.menu-list-item{
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>