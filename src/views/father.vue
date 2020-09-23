<template>
  <div class="father">
      <div style="width: 300px;height: 300px;border: 1px solid red;margin: 0 auto;">
          <h4>父组件</h4>
          <span>{{name1}}</span>
          <span>{{name2}}</span>
          <children-item ref="childrenItem"></children-item>
      </div>
  </div>
</template>
<script>
import childrenItem from '_c/children'
export default {
    components: {childrenItem},
    provide () {
        return {
            name: this
        }
    },
    data () {
        return {
            name1: '张三',
            name2: '李四',
        }
    },
    methods: {
    },
    mounted () {
        // console.log(this.$refs.childrenItem.name)
        // this.$refs.childrenItem.getName()
        // 效果相同
        // console.log(this.$children[0].name)
        // this.$children[0].getName()
    }
}
</script>
<style lang="less" scoped>
    .father {
        height: 300px;
        background: gold;
    }
</style>