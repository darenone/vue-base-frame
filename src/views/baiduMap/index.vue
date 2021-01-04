<template>
    <Row>
        <Col span="24">
            <vue-baidu-map style="height: 300px;"></vue-baidu-map>
        </Col>
        <Col span="24" style="margin-top: 10px;">
            <Col span="4">
                <Button @click="value1 = true" type="primary">地图大屏展示</Button>
                <Drawer width="100" :closable="true" v-model="value1" @on-visible-change="drawerChange1">
                    <component v-bind:is="component"></component>
                </Drawer>
            </Col>
            <Col span="5">
                <Button @click="value2 = true" type="primary">地铁线路图（截止到2020年）</Button>
                <Drawer width="100" :closable="true" v-model="value2" @on-visible-change="drawerChange2">
                    <img :src="img1" alt="">
                </Drawer>
            </Col>
            <Col span="5">
                <Button @click="value3 = true" type="primary">地铁线路图（截止到2024年）</Button>
                <Drawer width="100" :closable="true" v-model="value3" @on-visible-change="drawerChange3">
                    <img :src="img2" alt="">
                </Drawer>
            </Col>
            <Col span="5">
                <Button @click="value4 = true" type="primary">轨道交通线网规划（远景目标）</Button>
                <Drawer width="100" :closable="true" v-model="value4" @on-visible-change="drawerChange4">
                    <img :src="img3" alt="">
                </Drawer>
            </Col>
        </Col>
    </Row>
</template>
<script>
import vueBaiduMap from '_c/baidu';
export default {
    components: {vueBaiduMap},
    data () {
        return {
            component: '',
            value1: false,
            value2: false,
            value3: false,
            value4: false,
            img1: '',
            img2: '',
            img3: '',
        }
    },
    methods: {
        drawerChange1 (val) {
            if (val) {
                this.component = 'vueBaiduMap';
            } else {
                this.component = '';
            }
        },
        drawerChange2 (val) {
            if (val) {
                this.img1 = require("./../../assets/img/image/dt.jpg");
            } else {
                this.img1 = '';
            }
        },
        drawerChange3 (val) {
            if (val) {
                this.img2 = require("./../../assets/img/image/dt.jpg");
            } else {
                this.img2 = '';
            }
        },
        drawerChange4 (val) {
            if (val) {
                this.img3 = require("./../../assets/img/image/guihuaxianlu.jpg");
            } else {
                this.img3 = '';
            }
        },
    }
}
</script>