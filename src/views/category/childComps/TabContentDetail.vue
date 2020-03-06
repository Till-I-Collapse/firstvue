<template>
  <grid-view>
    <category-item v-for="(item, index) in categoryDetail" :key="index" :goods="item"></category-item>
  </grid-view>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'
  import CategoryItem from './CategoryItem'
  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      CategoryItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
</style>