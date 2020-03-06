<template>
  <div class="bottom-bar">
   <div class='checkAll'>
     <check-button class="button" @click.native="checkClick" :is-check="selectAll"></check-button>
     <span>全选</span>
   </div>
   
   <div class='price'>
     合计: {{totalPrice}}
   </div>

   <div class='calculate'>
     <span>结算({{length}})</span>
   </div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/checkButton'

export default {
  components:{
    checkButton
  },
  data(){
    return{
    }
  },
  computed:{
    totalPrice() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((pre, item) => {
          return pre + parseFloat(item.price.split("¥")[1]) * item.count
        }, 0).toFixed(2)


      // const newPrice = item.price.spilt("¥")[1]
      // parseFloat(newPrice)
    },
    length(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    selectAll(){
      if(this.$store.state.cartList.length == 0) return false
      for(let item of this.$store.state.cartList){
        if(!item.checked){
          return false
        }
        return true
      }
    }
  },
  methods:{
    checkClick(){
      if(this.selectAll){
        this.$store.state.cartList.forEach(item => {item.checked = false})
      }else{
        this.$store.state.cartList.forEach(item => {item.checked = true})
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  position: relative;
  display: flex;
  height: 40px;
  top:calc(100vh - 49px - 40px - 44px);
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}

.checkAll{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.button{
  height: 20px;
  width: 20px;
  margin-right: 5px;
  line-height: 20px;
}

.price{
  margin-left: 40px;
  flex:1
}

.calculate{
  text-align: center;
  width: 100px;
  background-color:var(--color-tint);
  color:#fff;
}
</style>