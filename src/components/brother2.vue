<template>
  <div class="brother2">
      <h3>兄弟组件2</h3>
      <p>{{value}}</p>
  </div>
</template>
<script>
export default {
    data () {
        return {
            value: null
        }
    },
    methods: {
    },
    mounted () {
        this.$bus.$on('sendData', val => {
            console.log(val)
            this.value = val
        })
    }
}
</script>