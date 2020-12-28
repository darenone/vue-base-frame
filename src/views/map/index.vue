<template>
    <Row>
        <Col span="12">
            <echart-map :id="'map1'" :data="mapData1" :styles="{height: '300px'}"></echart-map>
        </Col>
        <Col span="12">col-12</Col>
    </Row>
</template>
<script>
import echartMap from '_c/echart/echart-map'
export default {
    components: {echartMap},
    data () {
        return {
            mapData1: [
                {
                    name: '河南',
                    value: 100
                }
            ]
        }
    }
}
</script>