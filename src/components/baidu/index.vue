<template>
    <section class="baidu-map-wrapper">
        <vue-baidu-map class="bm-view" ak="xHuqN6if3aQHIyH4rwTkGc3NRgF4GLby" 
            :center="center"
            :zoom="zoom"
            @ready="ready" 
            @load="load" 
            @unload="unload" 
            @reload="reload"
            @click="click1">
        </vue-baidu-map>
        <div class="search-input">
            <Input v-model="keyword" clearable @on-clear="ZMap.search(keyword)" style="width: 200px;margin-right: 5px;"/>
            <Button type="primary" clearable @click="ZMap.search(keyword)">搜索</Button>
        </div>
        <div class="click-wrap">
            <h6 class="title" @click="click2">{{line_2024 ? '添加' : '删除'}}2024年线路图</h6>
            <h6 class="title" @click="click3">{{showArea ? '添加' : '删除'}}成都区域图</h6>
            <h6 class="title">远景线路图</h6>
        </div>
    </section>
</template>
<script>
import VueBaiduMap from 'vue-baidu-map/components/map/Map.vue';
import ZMap from './ZMap.js';
import {get_routeAll} from '@/api/route.js';
export default {
    name: 'baiduMap',
    components: { VueBaiduMap },
    data () {
        return {
            center: {lng: 104.074238, lat: 30.612572},
            zoom: 12,
            ZMap: null, // ZMap函数实例
            keyword: '',
            routeList1: [
                {label: '8号线二期', value: 8},
                {label: '8号线二期', value: 8.1},
                {label: '10号线三期', value: 10},
                {label: '13号线一期', value: 13},
            ],
            routeList2: [
                {label: '11号线', value: 11},
            ],
            line_2024: true,
            line_2024_list: [8, 17, 8.1, 19, 10, 13, 18, 18.1, 27, 30],
            showArea: true,
            colorConfig: {
                17: '#7B213B',
                8: '#B3D101',
                8.1: '#B3D101',
                19: '#95A3E7',
                10: '#0044B8',
                13: '#C2AD04',
                18: '#4D888F',
                18.1: '#4D888F',
                27: '#00A1E3',
                30: '#EF8AA1',
            }
        }
    },
    methods: {
        // 初始化地图
        ready ({BMap, map}) {
            /**
             * map指地图实例，等同于map = new BMap.Map("allmap")
             */
            this.ZMap = new ZMap({BMap, map});
            this.ZMap.init();
        },
        // 地图加载时调用
        load () {},
        // 地图卸载时调用
        unload () {},
        // 地图重新加载时调用
        reload () {},
        // 地图点击事件
        click1 () {},
        click2 () {
            this.line_2024 = !this.line_2024;
            if (this.line_2024) {
                this.ZMap.deletePolyline();
            } else {
                // 传值，比如传17就可以把17号线线路图画出来，如果想多画几条线，可以循环调用此接口，传入不同的号线就可以了
                this.line_2024_list.forEach(ele => {
                    this.get_routeAll(ele);
                })
            }
        },
        click3 () {
            this.showArea = !this.showArea;
            if (this.showArea) {
                this.ZMap.deleteBoundary();
            } else {
                // 传值，比如传17就可以把17号线线路图画出来，如果想多画几条线，可以循环调用此接口，传入不同的号线就可以了
                this.ZMap.boundary();
            }
        },
        // 根据line查询具体线路详情
        async get_routeAll (id) {
            try {
                const {status, code, data, msg} = await get_routeAll({id: id});
                if (status == 1) {
                    console.log(data)
                    this.ZMap.polyline(data, id, this.colorConfig[id]);
                }
            } catch (error) {
                console.log(error)
            }
            
        }
    },
    beforeDestroy () {
        // 组件销毁前先销毁地图实例
        this.ZMap = null;
        // this.map.destroy(); // 使用这种方式无效，暂时不知道为何
    }
}
</script>
<style lang="less">
.baidu-map-wrapper {
    position: relative;
    height: 100%;
    .bm-view {
        height: 100%;
    }
    .search-input {
        position: absolute;
        left: 5px;
        top: 5px;
    }
    .click-wrap {
        position: absolute;
        left: 5px;
        top: 50px;
        user-select: none;
        .title {
            font-size: 12px;
            color: red;
            font-weight: 600;
            cursor: pointer;
            
        }
        .line {
            list-style: none;
            margin-left: 5px;
            li {
                font-size: 12px;
                color: red;
                cursor: pointer;
            }
        }
    }
}
</style>