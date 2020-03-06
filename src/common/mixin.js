import BackTop from "components/content/backTop/BackTop"


export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  // mounted(){
  //   console.log(1)
  // },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y > 1000
    }
  }
}