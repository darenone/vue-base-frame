<template>
    <section style="width: 100%;height: 100%;">
        <div :id="id" ref="chartTree" v-show="!nodata" :style="styles"></div>
        <div v-show="nodata"  class="no-data" :style="styles">
            <img src="@/assets/img/chart/map_nodata.png" alt="">
        </div>
    </section>
</template>
<script>
import echarts from 'echarts';
import china from 'echarts/map/json/china';
import config2 from './config2';
export default {
    props: {
        id: {
            type: String,
            default: ""
        },
        data: {
            type: Array,
            default () {
                return []
            }
        },
        styles: {
            type: Object,
            default () {
                return {}
            }
        },
    },
    data () {
        return {
            nodata: false
        }
    },
    computed: {
        myChart() {
            echarts.registerMap('china', china);
            return echarts.init(document.getElementById(this.id));
        }
    },
    methods: {
        renderMap () {
            if (this.myChart) {
                this.myChart.clear();
                this.myChart.setOption(config2, {lazyUpdate: true});
                window.addEventListener("resize", this.resize);
            }
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
                this.renderMap(this.name);
            })
        } else {
            this.nodata = true;
        }
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.resize);
        if (this.myChart) {
            this.myChart.dispose();
        }
    },
}
</script>