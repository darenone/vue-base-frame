const state = {
    userName: '张三'
}
const getters = {
    userName: state => {
        return state.userName + '是管理员'
    }
}
const mutations = {}
const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}