import Vue from 'vue';
let vm = new Vue();
// 根据line查询具体线路
export function get_routeAll(params) {
    return vm.$http.post(`getRouteAll`, params)
}