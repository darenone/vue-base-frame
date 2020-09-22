import {getMenuList} from '@/api/app'

const actions = {
    // updateMenuList ({commit}) {
    //     getMenuList().then(res => {
    //         const {code, data: {menuList}} = res
    //         commit('SET_MENU_LIST', menuList)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }
    async updateMenuList({commit}) {
        try {
            const {code, data: {menuList}} = await getMenuList()
            commit('SET_MENU_LIST', menuList)
        } catch (err) {
            console.log(err)
        }
    }
}

export default actions