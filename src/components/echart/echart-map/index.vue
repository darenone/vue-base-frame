<template>
    <section style="width: 100%;height: 100%;">
        <div :id="id" ref="chartTree" v-show="!nodata" :style="styles"></div>
        <div v-show="nodata"  class="no-data" :style="styles">
            <img src="@/assets/img/chart/map_nodata.png" alt="">
        </div>
    </section>
</template>
<script>
import axios from 'axios';
import echarts from 'echarts';
import mapJson from '@/assets/json/china-main-city/china-main-city-map.js';
import config1 from './config1';
export default {
    props: {
        id: {
            type: String,
            default: ""
        },
        styles: {
            type: Object,
            default () {
                return {}
            }
        },
        data: {
            type: Array,
            default () {
                return []
            }
        },
        tooltip: {
            type: String,
            default: ""
        },
        visualMap: {
            type: String,
            default: ""
        },
        config: {
            type: String,
            default: "config1"
        },
        region: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data() {
        return {
            nodata: false,
        }
    },
    computed: {
        myChart() {
            return echarts.init(document.getElementById(this.id));
        }
    },
    methods: {
        renderMap(name) {
            this.getJson(name).then(res => {
                if (this.myChart) {
                    this.myChart.clear();
                    this.myChart.setOption(config1, {lazyUpdate: true});
                    window.addEventListener("resize", this.resize);
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getJson (name) {
            return new Promise((resolve, reject) => {
                axios.get(`./china-main-city/${mapJson[name]}.json`).then(resp => {
                    echarts.registerMap('HK', resp.data);
                    resolve(resp.data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        resize () {
            /* 把这个单独拎出来是因为如果写在window.addEventListener("resize", () => { this.myChart.resize()})里面
            当你需要移除这个监听事件的时候，这样写window.removeEventListener("resize")是不起作用的，而应该这样写
            window.addEventListener("resize", this.resieze)和window.removeEventListener('resize', this.resize)才可以正确移除*/
            this.myChart.resize();
        }
    },
    mounted () {
        if (this.data.length) {
            this.$nextTick(() => {
                this.renderMap('成都市');
            })
        } else {
            this.nodata = true;
        }
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.resize);
        this.myChart.dispose();
    },
}
</script>