<template>
    <ul class="a-submenu">
        <!-- 显示标题的地方 -->
        <div class="a-submenu-title" @click="handleClick">
            <slot name="title"></slot>
            <i :class="[showChild ? 'ivu-icon ivu-icon-ios-arrow-down' : 'ivu-icon ivu-icon-ios-arrow-back', 'a-submenu-title-icon']"></i>
        </div>
        <div v-show="showChild" class="a-submenu-child-box">
            <slot></slot>
        </div>
    </ul>
</template>
<script>
export default {
    name: 'ASubmenu',
    data () {
        return {
            showChild: false
        }
    },
    methods: {
        handleClick () {
            this.showChild = !this.showChild;
        }
    }
}
</script>
<style lang="less">
.a-submenu {
    cursor: pointer;
    &-title {
        color: hsla(0,0%,100%,.7);
        height: 45px;
        line-height: 45px;
        text-align: left;
        padding-left: 15px;
        div {
            display: inline-block;
        }
        &-icon {
            color: hsla(0,0%,100%,.7);
            float: right;
            line-height: 45px;
            margin-right: 20px;
        }
    }
    &-child-box {
        overflow: hidden;
    }
}
</style>