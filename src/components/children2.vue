<template>
  <div class="children" style="margin: 30px;border:1px solid black;height: calc(100% - 90px);">
      <h4>子组件-2</h4>
  </div>
</template>
<script>
export default {
    data () {
        return {
            name: '子组件-2'
        }
    },
    methods: {
        getName () {
            console.log(this.name)
        }
    },
    mounted () {
        console.log(this.$parent.name) // 子组件-1
    }
}
</script>
<style lang="less" scoped>

</style>