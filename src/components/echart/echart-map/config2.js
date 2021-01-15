var dataList = [{
    name: "南海诸岛",
    value: 0
},
{
    name: '北京',
    value: 54
},
{
    name: '天津',
    value: 13
},
{
    name: '上海',
    value: 40
},
{
    name: '重庆',
    value: 75
},
{
    name: '河北',
    value: 13
},
{
    name: '河南',
    value: 83
},
{
    name: '云南',
    value: 11
},
{
    name: '辽宁',
    value: 19
},
{
    name: '黑龙江',
    value: 15
},
{
    name: '湖南',
    value: 69
},
{
    name: '安徽',
    value: 60
},
{
    name: '山东',
    value: 39
},
{
    name: '新疆',
    value: 4
},
{
    name: '江苏',
    value: 31
},
{
    name: '浙江',
    value: 104
},
{
    name: '江西',
    value: 36
},
{
    name: '湖北',
    value: 1052
},
{
    name: '广西',
    value: 33
},
{
    name: '甘肃',
    value: 7
},
{
    name: '山西',
    value: 9
},
{
    name: '内蒙古',
    value: 7
},
{
    name: '陕西',
    value: 22
},
{
    name: '吉林',
    value: 4
},
{
    name: '福建',
    value: 18,
},
{
    name: '贵州',
    value: 5
},
{
    name: '广东',
    value: 98
},
{
    name: '青海',
    value: 1
},
{
    name: '西藏',
    value: 0
},
{
    name: '四川',
    value: 44,
},
{
    name: '宁夏',
    value: 0,
},
{
    name: '海南',
    value: 22
},
{
    name: '台湾',
    value: 3
},
{
    name: '香港',
    value: 5
},
{
    name: '澳门',
    value: 5
}
];
export default {
    title: {
        text: '中国地图',
        subtext: 'echart例子',
        sublink: 'https://www.makeapie.com/editor.html?c=x1-bQDu00'
    },
    visualMap: {
        type: 'piecewise',
        pieces: [
            {min: 120, color: '#FB7477', label: 'x > 120'},
            {min: 80, max: 120, color: '#FFC380', label: '80 < x ≤ 120'},
            {min: 50, max: 80, color: '#F1E550', label: '50 < x ≤ 80'},
            {min: 20, max: 50, color: '#86E9AA', label: '20 < x ≤ 50'},
            {max: 20, color: '#30B3A3', label: 'x ≤ 20'}
        ],
        left: '10',
        bottom: '-5',
        align: 'left',
        textStyle: {
            color: '#5c6066',
            fontSize: 12,
            fontFamily: 'Microsoft YaHei'
        },
        itemSymbol: 'circle'
    },
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        },
        backgroundColor: 'white',
        textStyle: {
            color: '#333333'
        },
        formatter: function(params) {
            var html = '';
            html +=
                '<div>'+
                '<div style="border-bottom: 1px solid #dcdee5;height:30px;line-height:30px;font-size:16px;font-weight:600;color:#3b3b3b;"><span>' + params.name + '</span></div>' +
                '<div>' +
                    '<p style="height:30px;line-height:30px;font-size:14px;">值<span style="font-size: 16px;color:#42C4C6;font-weight:600;margin-left:10px;">' + params.value + 'ms</span></p>' +
                '</div>' +
                '</div>'
            return html;
        },
    },
    geo: {
        map: "china",
        roam: true,
        scaleLimit: {
            min: 1,
            max: 2
        },
        zoom: 1.23,
        top: 120,
        label: {
            normal: {
                show: true,
                fontSize: "12",
                color: "rgba(0,0,0,0.7)",
                formatter: function (params) {
                    for (let i = 0; i < dataList.length; i++) {
                        const ele = dataList[i];
                        if (ele.name == params.name) {
                            return `${params.name} ${(ele.value / 100).toFixed(2)}%/${ele.value}`;
                        }
                        
                    }
                }
            }
        },
        itemStyle: {
            normal: {
                //shadowBlur: 50,
                //shadowColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
                areaColor: "#f2d5ad",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0
            }
        }
    },
    series: [{
        name: "网络时延",
        type: "map",
        geoIndex: 0,
        data: dataList
    }]
};