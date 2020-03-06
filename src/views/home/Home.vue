<template>
  <div id="home">
    <nav-bar class='home-nav'><div slot='center'>购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                  @itemClick='tabClick'
                  ref="tabControl1"
                  class ="tab-control" v-show="isTabFixed"></tab-control>
  <scroll class='content' 
  ref='scroll' 
  :probeType="3" 
  @scroll='contentScroll'
  :pullUpLoad="true"
  @pullingUp='loadMore'>
    <div>
      <home-swiper :banners='banners' @swiperImgLoad="swiperImgLoad"></home-swiper>
      <feature-view :features='recommends'></feature-view>
      <recommend-view></recommend-view> 
      <tab-control :titles="['流行','新款','精选']"
                  @itemClick='tabClick'
                  ref="tabControl2"></tab-control>
      <goods-list :goods="goodsList[currentType].list"></goods-list>
    </div>
  </scroll>
  <back-top @click.native='backTop' v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import FeatureView from './childComps/FeatureView'
  import RecommendView from './childComps/RecommendView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from './childComps/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata,getHomeData} from 'network/home'
  import {debounce} from 'common/utils'
  import {backTopMixin} from 'common/mixin'
export default {
  name:"Home",
  components:{
    NavBar,
    HomeSwiper,
    FeatureView,
    RecommendView,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins:[backTopMixin],
  props:{
  },
  data(){
    return {
      // result:[], //保存数据，防止数据回收
      banners:[],
      recommends:[],
      goodsList:{
        'pop':{page:1,list:[]},
        'new':{page:1,list:[]},
        'sell':{page:1,list:[]}
      },
      currentType:'pop',
      tabOffsetTop : 0,
      isTabFixed: false,
      saveY:0,
    }
  },
  created(){
    //请求多个数据
    this.getHomeMultidata(),
    
    //请求商品数据
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')

  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,10)
    this.$bus.$on("homeItemImgLoad",()=>{
      refresh()
    })
  },
  computed:{},
  methods:{
    /**
     * 事件监听方法
     */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backTop(){
      // console.log('返回顶部');
      this.$refs.scroll.scrollTo(0,0)  
    },
    contentScroll(position){
      // 1.置顶
      // this.isShowBackTop = (-position.y) > 1000
      this.listenShowBackTop(position)
      // 2.导航栏吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeData(this.currentType)
    },
    swiperImgLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
      // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeData(type){
      // const page = this.goodsList[type].page;
      // getHomeData(type,page).then(res => {
      //   this.goodsList.type.list.push(...res.data.list)
      //   this.goodsList[type].page +=1 
      // })
      const page = this.goodsList[type].page+1
      getHomeData(type,page).then(res =>{
        this.goodsList[type].list.push(...res.data.list)
        this.goodsList[type].page +=1 
        console.log(res)

        this.$refs.scroll.finishPullUp()
      })
    }
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
  }
}
</script>
<style scoped>
  #home{
    position:relative;
    height:100vh;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    right: 0; */
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>