import Vue from 'vue'
let vm = new Vue()
// 详细数据统计
export function getNetDataList(params) {
    return vm.$http.post(`dataStatistics/getNetDataList`, params);
}
// 查询用户
export const getUserList = params => {
    return vm.$http.get(`getUserList?start=${params.start}&length=${params.length}`)
}
// 新增用户
export function addUser(params) {
    return vm.$http.post(`addUser`, params)
}
// 根据ID查询用户详情
export function getUserById(params) {
    return vm.$http.post(`getUserById`, params)
}
// 
// 更新用户
export function upDateUser(params) {
    return vm.$http.post(`upDateUser`, params)
}
// 删除用户
export function deleteUser(params) {
    return vm.$http.post(`deleteUser`, params)
}