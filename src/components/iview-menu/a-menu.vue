<template>
    <section class="i-menu-wrapper">
        <slot></slot>
        <Menu width="auto" v-if="!collapsed">
            <template v-for="(item, index) in list">
                <MenuItem v-if="!item.children" :name="`menu_${item.title}_${index}`" :key="`menu_item_${index}`" :to="item.path">{{ item.title }}</MenuItem>
                <i-resubmenu v-else :parent="item" :key="`menu_item_${index}`" :index="index"></i-resubmenu>
            </template>
        </Menu>
        <div v-else class="drop-wrapper">
            <template v-for="(item, index) in list">
                <Tooltip v-if="!item.children" :content="item.title" placement="right" :key="`menu_item_${index}`">
                    <span class="drop-menu-span" @click="handleClick(item.title)">
                        <Icon type="logo-apple" color="#fff" :size="20"/>
                    </span>
                </Tooltip>
                <i-redropdown v-else :parent="item" :key="`menu_item_${index}`" icon-color="#fff" :show-title="false"></i-redropdown>
            </template>
        </div>
    </section>
</template>
<script>
import iResubmenu from './re-submenu.vue';
import iRedropdown from './re-dropdown.vue';
export default {
    name: 'iAmenu',
    components: {iResubmenu, iRedropdown},
    props: {
        collapsed: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {

        }
    },
    methods: {
        handleClick (name) {
            console.log(name);
        }
    }
}
</script>
<style lang="less">
.i-menu-wrapper {
    width: 100%;
    .ivu-tooltip, .drop-menu-span {
        display: block;
        width: 100%;
        text-align: center;
        padding: 5px 0;
        cursor: pointer;
    }
    .ivu-dropdown .drop-menu-span {
        padding: 10px 0;
    }
    .drop-wrapper>.ivu-dropdown {
        display: inline;
        margin: 0 auto;
        padding-top: 5px;
    }
}
</style>