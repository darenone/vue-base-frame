import axios from 'axios';

const ZMap = function ({BMap, map}) {
    this.BMap = BMap;
    this.map = map;
    this.local = null;
    this.polylineOverlay = []; // 线覆盖物集合
    this.polyAreaOverlay = []; // 区域覆盖物集合
    this.labelOverlaylist = []; // 文字覆盖物集合
    this.markerOverlaylist = []; // 点标记集合
}
ZMap.prototype = {
    init () {
        this.map.enableScrollWheelZoom(true); // 开启缩放
    },
    // 获取边界，添加区域覆盖物
    boundary () {
        const _this = this;
        /**
         * 成都总共有24个区，循环出每个区的经纬度，依次将24个区域的轮廓画在地图上
         */
        this.getJson().then(res => {
            res.forEach((ele1, i) => {
                let str = '';
                ele1.geometry.coordinates[0].forEach((ele2, j) => {
                    if (j == ele1.geometry.coordinates[0].length - 1) {
                        str += ele2[0] + "," + ele2[1];
                    } else {
                        str += ele2[0] + "," + ele2[1] + ';';
                    }
                })
                let polyline = new _this.BMap.Polyline(str,{
                    strokeColor: "#333333",
                    strokeWeight: 1, 
                    strokeOpacity: 0.9,
                    strokeStyle: 'dashed',
                });
                _this.map.addOverlay(polyline);
                _this.polyAreaOverlay.push(polyline);
            });
        }).catch(err => {
            console.log(err);
        })
    },
    // 删除区域
    deleteBoundary () {
        let arr = [...this.polyAreaOverlay];
        arr.forEach((ele, i) => {
            this.map.removeOverlay(ele);
            this.polyAreaOverlay.splice(i, 1); // 移除成功，从polyAreaOverlay里删除这一项
        })
    },
    getJson () {
        return new Promise((resolve, reject) => {
            /**
             * 这里获取成都市各个区的边界经纬度
             * 更多json数据可以在项目里public/china-main-city这个文件夹里获得
             * 也可以访问http://datav.aliyun.com/tools/atlas/#&lat=30.332329214580188&lng=106.72278672066881&zoom=3.5下载想要的json数据
             */
            axios.get(`./china-main-city/510100.json`).then(resp => {
                resolve(resp.data.features)
            }).catch(err => {
                reject(err);
            })
        })
    },
    // 位置检索
    search (keyword) {
        if (keyword) {
            this.local = new this.BMap.LocalSearch(this.map, {
                renderOptions: {map: this.map}
            });
            this.local.search(keyword);
        } else {
            if (this.local) {
                this.local.clearResults();
            }
        }
    },
    // 添加折线覆盖物
    polyline (list, id, color) {
        let arr = [];
        list.forEach((ele, i) => {
            arr.push(new this.BMap.Point(ele.lng, ele.lat))
            if (i == list.length - 1) {
                this.labelOverlay(ele.lng, ele.lat, id)
            }
            // this.markerOverlay(ele.lng, ele.lat);
        })
        let polyline = new this.BMap.Polyline(arr, {
            strokeColor: color,
            strokeWeight: 2,
            strokeOpacity: 0.5
        });
        this.map.addOverlay(polyline);
        this.polylineOverlay.push(polyline); // 将生成的线覆盖物实例放入到list里面，方便以后删除覆盖物时，从这个list中取实例就行
    },
    // 删除折线覆盖物
    deletePolyline () {
        let arr = [...this.polylineOverlay];
        arr.forEach((ele, i) => {
            this.map.removeOverlay(ele);
            this.polylineOverlay.splice(i, 1); // 移除成功，从polylineOverlay里删除这一项
        })
        this.deleteLabelOverlay(); // 删除文字覆盖物
        this.deleteMarkerOverlay(); // 删除点覆盖物
    },
    // 添加文字覆盖物
    labelOverlay (lng, lat, id) {
        let label = new this.BMap.Label(id, {
            position: new BMap.Point(lng, lat), // 指定文本标注所在的地理位置
            offset: new BMap.Size(0, -10) // 设置文本偏移量
        })
        this.map.addOverlay(label);
        this.labelOverlaylist.push(label);
    },
    // 删除文字覆盖物
    deleteLabelOverlay () {
        let arr = [...this.labelOverlaylist];
        arr.forEach((ele, i) => {
            this.map.removeOverlay(ele);
            this.polyAreaOverlay.splice(i, 1);
        })
    },
    // 添加点标记
    markerOverlay (lng, lat) {
        let marker = new this.BMap.Marker(new this.BMap.Point(lng, lat));
        this.map.addOverlay(marker);
        this.markerOverlaylist.push(marker);
    },
    deleteMarkerOverlay () {
        let arr = [...this.markerOverlaylist];
        arr.forEach((ele, i) => {
            this.map.removeOverlay(ele);
            this.markerOverlaylist.splice(i, 1);
        })
    },
}
export default ZMap;