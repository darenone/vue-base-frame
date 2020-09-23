<template>
  <div class="brother1">
      <h3>兄弟组件1</h3>
      <button @click="sendData">兄弟组件1</button>
  </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        sendData () {
            this.$bus.$emit('sendData', 1)
        }
    }
}
</script>