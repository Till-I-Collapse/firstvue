<template>
  <div ref='wrapper'>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    },
    data:{
      type:Array,
      default(){
        return []
      }
    }
  },
  //钩子函数中变量寿命问题 保存数据  
  data(){
    return{
      scroll:{}
    }
  },
  mounted(){
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 2.监听滚动位置
    this.scroll.on("scroll",(position)=>{
      this.$emit('scroll',position)
    })
    // 3.监听上拉加载事件
    this.scroll.on("pullingUp",()=>{
      // console.log("加载中")
      this.$emit('pullingUp')
    })
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll.y
    }
  }
}
</script>