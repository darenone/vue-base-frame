import {getUserName} from '@/api/app'

const state = {
    userName: '张三'
}
const getters = {
    userName: state => {
        return state.userName + '是管理员'
    }
}
const mutations = {
    SET_USER_NAME (state, params) {
        state.userName = params
    }
}
const actions = {
    async getUserName ({commit}) {
        try {
            const {code, data: {name}} = await getUserName()
            commit('SET_USER_NAME', name)
        } catch (error) {
            console.log(err)
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}