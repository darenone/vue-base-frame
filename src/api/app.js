export const getMenuList = () => {
    return new Promise((resolve, reject) => {
        const err = null
        setTimeout(() => {
            if (!err) {
                resolve({
                    code: 200,
                    data: {
                        menuList: [
                            {name: '创建任务'},
                            {name: '任务列表'}
                        ]
                    }
                })
            } else {
                reject(err)
            }
        })
    })
}
export const getUserName = () => {
    return new Promise((resolve, reject) => {
        const err = null
        setTimeout(() => {
            if (!err) {
                resolve({
                    code: 200,
                    data: {
                        name: '李四'
                    }
                })
            } else {
                reject(err)
            }
        })
    })
}