<template>
  <div class='nav-bar'>
      <div class='left'><slot name='left'></slot></div>
      <div class='center'><slot name='center'></slot></div>
      <div class='right'><slot name='right'></slot></div>    
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  computed:{},
  methods:{},
  mounted(){}
}
</script>
<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    text-align: center;
    line-height: 44px;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }
  .left, .right{
    width: 60px;
  }
  .center{
    /* 中间占据其他内容 */
    flex:1;
  }
</style>