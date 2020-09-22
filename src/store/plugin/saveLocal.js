const saveLocal = store => {
    // 当浏览器刷新的时候执行，也就是store初始化的时候执行
    // 当刷新浏览器时，第一次做的操作就写在这里
    console.log('store初始化')
    if (sessionStorage.menuType) {
        store.state.menuType = sessionStorage.menuType
        // store.replaceState(JSON.parse(localStorage.state))
    }
    console.log(store.state)
    // store.subscribe方法，只要项目里有提交mutation的动作都会触发一次这个方法
    store.subscribe((mutation, state) => {
        console.log('提交了mutation')
        console.log(state)
        sessionStorage.menuType = state.menuType
        // localStorage.state.menuType = state.menuType
        // localStorage.state = JSON.stringify(state)
    })
}

export default saveLocal