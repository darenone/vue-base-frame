
export const setTitle = (title) => {
    window.document.title = title ? title + '-基础框架' : '基础框架'
}
// 提示框去重
let latestTime = ''
export const isShowPrompt = () => {
    let flag = false
    if (!latestTime || new Date() - latestTime > 2000) {
        latestTime = new Date()
        flag = true
    }
    return flag
}