<template>
    <Dropdown placement="right-start" @on-click="handleClick">
        <span class="drop-menu-span" :style="titleStyle">
            <Icon type="logo-apple" :color="iconColor" :size="20"/>
            <span v-if="showTitle">{{parent.title}}</span>
        </span>
        <DropdownMenu slot="list">
            <template v-for="(item, i) in parent.children">
                <DropdownItem v-if="!item.children" :name="`menu_${item.title}_${index}`" :key="`menu_item_${index}_${i}`">
                    <Icon type="logo-apple" color="#5e5a6e" :size="20"/>
                    <span>{{item.title}}</span>
                </DropdownItem>
                <i-redropdown v-else :parent="item" :index="i" :key="`menu_item_${index}_${i}`"></i-redropdown>
            </template>
        </DropdownMenu>
    </Dropdown>
</template>
<script>
export default {
    name: 'iRedropdown',
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
        },
        iconColor: {
            type: String,
            default: '#5e5a6e'
        },
        showTitle: {
            type: Boolean,
            default: true
        },
    },
    computed: {
        titleStyle () {
            return {
                textAlign: this.showTitle ? 'left' : 'center',
                padding: this.showTitle ? '5px 16px' : ''
            }
        }
    },
    data () {
        return {

        }
    },
    methods: {
        handleClick (name) {
            // 防止click事件触发多次
            console.log(this.showTitle)
           if (!this.showTitle) {
               console.log(name);
           }
        },
    },
    mounted () {
        console.log('hello')
    }
}
</script>