<template>
  <div id="app">
    <div class="content">
      <div class="content-left">
        <!-- <div id="nav">
          <ul>
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/about">About</router-link>
            </li>
            <li>
              <router-link to="/house">house</router-link>
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
              <router-link :to="{name: 'computer'}">电脑</router-link>
            </li>
            <li>
              <router-link to="/father">父组件</router-link><br>
            </li>
          </ul>
        </div> -->
        <a-menu>
          <template v-for="(item, index) in navList">
            <a-menu-item v-if="!item.children" :uId="`menu_${item.title}_${index}`" :key="`menu_item_${index}`" :style="{'padding-left': `${item.level * 20}px`}">
              <router-link :to="item.path">{{ item.title }}</router-link>
            </a-menu-item>
            <re-submenu v-else :parent="item" :key="`menu_item_${index}`" :index="index"></re-submenu>
          </template>
        </a-menu>
      </div>
      <div class="content-right">
        <transition name="router">
          <router-view key="default"/>
          <router-view key="email" name="email"/>
          <router-view key="tel" name="tel"/>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import menuComponents from "_c/menu"
import ReSubmenu from '_c/menu/re-submenu.vue'
const { AMenu, AMenuItem} = menuComponents
export default {
  name: 'App',
  components: {
    AMenu,
    AMenuItem,
    ReSubmenu
  },
  data () {
    return {
      navList: []
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
    },
    loopFun(list, index, path) {
      let arr = []
      index++
      list.forEach(e => {
        let pathUrl = path && e.path ? path + '/' + e.path : e.path;
        if (e.name) {
          if (e.children) {
            let children = this.loopFun(e.children, index, pathUrl)
            arr.push({
              path: pathUrl,
              title: e.name,
              children: children,
              level: index
            })
          } else {
            arr.push({
              path: pathUrl,
              title: e.name,
              level: index
            })
          }
        }
      })
      return arr;
    },
  },
  mounted () {
    let routerList = this.$router.options.routes;
    this.navList = this.loopFun(routerList, 0, '');
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
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    &-left {
      width: 200px;
      height: 100%;
      background: #42b983;
      overflow: hidden;
      overflow-y: auto;
    }
    &-right {
      flex: 1;
      background: palegoldenrod;
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
