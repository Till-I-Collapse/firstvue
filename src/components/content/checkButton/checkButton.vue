<template>
  <div class="check-button" :class={check:isCheck}>
    <img src="~assets/img/cart/Tick.svg" alt="">
  </div>
</template>

<script>
export default {
  props:{
    isCheck:{
      type:Boolean,
      default:false
    }
  },
}
</script>

<style scoped>

.check-button{
  border:2px solid #aaa;
  border-radius: 50%;
}

.check{
  background-color: var(--color-tint);
  border-color: var(--color-tint)
}

</style>