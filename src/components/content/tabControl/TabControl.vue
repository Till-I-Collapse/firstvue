<template>
  <div class='tab-control'>
    <div v-for='(item, index) in titles'
    class="tab-control-item" 
    :class="{active: index===currentIndex}" 
    @click='itemClick(index)'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  computed:{},
  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('itemClick',index);
    }
  }
}
</script>
<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 2px solid var(--color-high-text);
  }
</style>