<template>
  <div class="children" style="margin: 30px;border:1px solid black;height: calc(100% - 100px);">
      <h4>子组件-1</h4>
      <children-item2 ref="childrenItem2"></children-item2>
  </div>
</template>
<script>
const childrenItem2 = () => import('_c/children2')
export default {
    components: {childrenItem2},
    data () {
        return {
            name: '子组件-1'
        }
    },
    methods: {
        getName () {
            console.log(this.name)
        }
    },
    mounted () {
        console.log(this.$parent.name1) // 张三

        console.log(this.$refs.childrenItem2.name) // 子组件-2
        console.log(this.$children[0].name) // 子组件-2
    }
}
</script>
<style lang="less" scoped>

</style>