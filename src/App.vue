<template>
  <div id="app">
    <router-view/>
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
html, body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
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
