<template>
    <div class="a-menu">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'AMenu'
}
</script>
<style lang="less">
.a-menu {
    background: #515a6e;
    & * {
        list-style: none;
    }
    ul {
        padding: 0;
        margin: 0;
    }
}
</style>