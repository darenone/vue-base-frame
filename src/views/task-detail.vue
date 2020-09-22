<template>
    <section>
        {{taskId}}
        <ul>
            <li>今天你吃药了嘛？</li>
        </ul>
        <!-- {{menuType}} -->
        <p>{{userName}}</p>
        <p>{{menuType}}</p>
        <button @click="handleChangeMenuType('2')">修改menuType的值</button><br>
        <button @click="handleChangeMenuList">异步获取菜单list</button>
        <ul>
            <li v-for="(item, index) in menuList" :key="index">{{item.name}}</li>
        </ul>
        <button @click="handleChangeUserName">异步获取userName</button>
    </section>
</template>
<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
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
        ...mapState([
            'menuList',
            'userName',
            'menuType'
        ]),
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
        ...mapMutations([
            'SET_USER_NAME',
            'SET_MENU_TYPE'
        ]),
        ...mapActions([
            'updateMenuList',
            'getUserName'
        ]),
        handleChangeMenuType () {
            this.SET_MENU_TYPE('2')
        },
        handleChangeMenuList () {
            this.updateMenuList()
        },
        handleChangeUserName () {
            this.getUserName()
        }
    },
}
</script>