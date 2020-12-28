import Vue from 'vue'
let vm = new Vue()
// 查询用户
export const get_house_list = params => {
    return vm.$http.get(`getHouseList?start=${params.start}&length=${params.length}`)
}
// 新增用户
export function add_house(params) {
    return vm.$http.post(`addHouse`, params)
}
// 根据ID查询用户详情
export function get_house_byId(params) {
    return vm.$http.post(`getHouseById`, params)
}
// 
// 更新房子
export function upDate_house(params) {
    return vm.$http.post(`upDateHouse`, params)
}
// 删除用户
export function delete_house(params) {
    return vm.$http.post(`deleteHouse`, params)
}