<template>
    <Submenu :name="`menu_${parent.title}_${index}`">
        <template slot="title">
            {{parent.title}}
        </template>
        <template v-for="(item, i) in parent.children">
            <MenuItem v-if="!item.children" :name="`menu_${item.title}_${index}`" :key="`menu_item_${index}_${i}`">{{ item.title }}</MenuItem>
            <i-resubmenu v-else :parent="item" :index="i" :key="`menu_item_${index}_${i}`"></i-resubmenu>
        </template>
    </Submenu>
</template>
<script>
export default {
    name: 'iResubmenu',
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