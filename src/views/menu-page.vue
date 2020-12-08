<template>
    <div class="menu-box">
        <a-menu>
            <template v-for="(item, index) in navList">
                <a-menu-item v-if="!item.children" :uId="`menu_${item.title}_${index}`" :key="`menu_item_${index}`" :style="{'padding-left': `${item.level * 20}px`}">{{ item.title }}</a-menu-item>
                <re-submenu v-else :parent="item" :key="`menu_item_${index}`" :index="index"></re-submenu>
            </template>
        </a-menu>
    </div>
</template>
<script>
import menuComponents from "_c/menu"
import ReSubmenu from '_c/menu/re-submenu.vue'
const { AMenu, AMenuItem } = menuComponents
export default {
    name: 'menu_page',
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
.menu-box {
    width: 200px;
}
</style>