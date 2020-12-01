<template>
    <a-sub-menu>
        <div slot="title" :style="{'padding-left': `${parent.level * 20}px`}">{{parent.title}}</div>
        <template v-for="(item, i) in parent.children">
            <a-menu-item v-if="!item.children" :uId="`menu_${item.title}_${i}`" :key="`menu_item_${index}_${i}`" :style="{'padding-left': `${item.level * 20}px`}">
                <router-link :to="item.path">{{ item.title }}</router-link>
            </a-menu-item>
            <re-submenu v-else :parent="item" :index="i" :key="`menu_item_${index}_${i}`"></re-submenu>
        </template>
    </a-sub-menu>
</template>
<script>
import menuComponents from "_c/menu"
const { ASubMenu, AMenuItem} = menuComponents
export default {
    name: 'ReSubmenu', // 这里一定要有name值，才能引用自身的组件，否则不可以
    components: {
        ASubMenu,
        AMenuItem,
    },
    props: {
        parent: {
            type: Object,
            default () {
                return {}
            }
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {

        }
    }
}
</script>