const getters = {
    menuType: state => {
        if (state.menuType == 1) {
            return 'ping拨测'
        } else {
            return '网页拨测'
        }
    }
}

export default getters