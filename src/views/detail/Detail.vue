<template>
  <div id="detail">
    <detail-nav-bar :class="{navBar:opacity}" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
    ref="scroll"
    :probeType="3"
    @scroll="detailScroll">
      <div>
        <!-- <ul>
          <li v-for="item in $store.state.cartList">{{item}}</li>
        </ul> -->
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo"/>
        <detail-params-info ref="params" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <div class="recommend">
          <span>热门推荐</span>
        </div>
        <goods-list ref="recommend" :goods="recommends"/>
      </div>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native='backTop' v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodsList from './../home/childComps/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import {getDetail,Goods,Shop,getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {backTopMixin} from 'common/mixin'

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll
  },
  mixins:[backTopMixin],
  data(){
    return{
      iid:null,
      topImages:null,
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      detailY:[],
      getDetailY:null,
      isShow:false,
      currentIndex:0,
      opacity:false
    }
  },
  created(){
    //获取iid
    this.iid=this.$route.params.iid
    // 根据获取的iid请求数据
    getDetail(this.iid).then(res => {
      // console.log(res)

      //1.获取结果
      const data = res.result

      //2.获取顶部信息
      this.topImages = data.itemInfo.topImages

      //3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //4.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //5.获取详情信息
      this.detailInfo = data.detailInfo

      //6.取出参数信息
      this.paramInfo = data.itemParams

      //7.取出评论信息
      if(data.rate.list){
        this.commentInfo = data.rate.list[0]
      }
    })

    //获取推荐信息
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
    })

  },
  methods:{
    detailScroll(position){
      const positionY = -position.y
      const length = this.detailY.length
      for(let i=0;i<length;i++){
        if(positionY >= this.detailY[i] && positionY < this.detailY[i+1]){
          if(this.currentIndex !== i){   
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      }
      this.opacity = (-position.y) > 44
      this.listenShowBackTop(position)
    },
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.detailY[index],100)
    },
    addToCart() {
      // 1.创建对象
      const obj = {}
      // 2.对象信息
      obj.iid = this.iid;
      obj.image = this.topImages[0]
      obj.title = this.goods.title
      obj.desc = this.goods.desc;
      obj.price = this.goods.newPrice;
      // 3.添加到Store中(actions)
      this.$store.commit('addCart',obj)
      // this.$store.dispatch('addCart', obj)
    },
  },
  mounted(){
    this.getDetailY = debounce(()=>{
      this.detailY=[]
      this.detailY.push(0)
      this.detailY.push(this.$refs.params.$el.offsetTop)
      this.detailY.push(this.$refs.comment.$el.offsetTop)
      this.detailY.push(this.$refs.recommend.$el.offsetTop)
      this.detailY.push(Number.MAX_VALUE)
      // console.log(this.detailY)
    },100)

    const refresh = debounce(this.$refs.scroll.refresh,100)
    this.$bus.$on('detailItemImgLoad',()=>{
      refresh()
      this.getDetailY()
    })
  }
}
</script>

<style scoped>
#detail{
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 1;
}

.content{
  position: absolute;
  overflow: hidden;
  background-color: #fff;
  /* height: calc(100%-44px) */
  top:44px;
  bottom: 0px;
}

.navBar{
  opacity: 0.6;
}

.recommend{
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>