const mutations = {
    SET_MENU_TYPE (state, params) {
        state.menuType = params
    },
    SET_MENU_LIST (state, params) {
        state.menuList = params
    },
    SET_CURRENT_NAV: (state, params) => {
        state.currentNav = params
    }
}

export default mutations