<template>
    <Row>
        <Col span="24">
            <echart-map :id="'map1'" :data="mapData1" :name="'成都市'" :styles="{height: '500px'}"></echart-map>
        </Col>
        <Col span="24">
            <echart-map2 :id="'map2'" :data="mapData2" :styles="{height: '500px'}"></echart-map2>
        </Col>
    </Row>
</template>
<script>
import echartMap from '_c/echart/echart-map'
import echartMap2 from '_c/echart/echart-map/index2'
export default {
    components: {echartMap, echartMap2},
    data () {
        return {
            mapData1: [
                {
                    name: '河南',
                    value: 100
                }
            ],
            mapData2: [
                {
                    name: '河南',
                    value: 100
                }
            ]
        }
    }
}
</script>