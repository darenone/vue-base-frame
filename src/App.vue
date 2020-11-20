<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/task-detail">任务详情10000218</router-link>
        </li>
        <li>
          <router-link to="/task-detail/10000217">任务详情10000217</router-link>
        </li>
        <li>
          <router-link to="/task-detail/10000216">任务详情10000216</router-link>
        </li>
        <li>
          <button @click="go_page('10000218')">任务详情10000218</button>
        </li>
        <li>
          <button @click="go_page('10000217')">任务详情10000217</button>
        </li>
        <li>
          <button @click="go_page('10000216')">任务详情10000216</button>
        </li>
        <li>
          <router-link to="/product">产品</router-link><br>
        </li>
         <li>
          <router-link to="/product/ele-product">电子产品</router-link><br>
        </li>
        <li>
          <router-link to="/product/ele-product/phone">手机</router-link>
          <!-- <router-link to="/product/ele-product/computer">电脑</router-link> -->
          <router-link :to="{name: 'computer'}">电脑</router-link>
        </li>
        <li>
          <router-link to="/father">父组件</router-link><br>
        </li>
      </ul>
    </div>
    <transition name="router">
      <router-view/>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    go_page (taskId) {
      this.$router.push({
        name: 'task-detail',
        params: {
          taskId: taskId
        }
      })
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.router-enter {
  opacity: 0;
}
.router-enter-active {
  transition: opacity 0.5s ease;
}
.router-enter-to {
  opacity: 1;
}
.router-leave {
  opacity: 1;
}
.router-leave-active {
  transition: opacity 0.5s ease;
}
.router-leave-to {
  opacity: 0;
}
</style>
