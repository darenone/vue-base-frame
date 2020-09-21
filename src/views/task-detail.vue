<template>
    <section>
        {{taskId}}
        <ul>
            <li>今天你吃药了嘛？</li>
        </ul>
        <!-- {{menuType}} -->
        <!-- {{userName}} -->
        {{userName}}
    </section>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
export default {
    props: {
        taskId: {
            type: [String, Number],
            default: ''
        }
    },
    computed: {
        // ...mapState({
        //     userName: state => state.user.userName
        // }),
        // ...mapState([
        //     'menuType',
        // ]),
        // menuTypeName () {
        //     return this.$store.getters.menuType
        // },
        ...mapGetters([
            'userName'
        ])
    },
    data () {
        return {
            
        }
    },
    methods: {
        
    },
    beforeRouteLeave (to, from, next) {
        // const leave = confirm('确定离开吗？')
        // if (leave) {
        //     next()
        // } else {
        //     next(false)
        // }
        next(vm => {
            console.log(vm) // vue实例
        })
    },
    beforeRouteUpdate (to, from, next) {
        console.log('组件被复用')
        next()
    }
}
</script>