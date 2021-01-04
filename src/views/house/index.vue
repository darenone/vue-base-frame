<template>
    <Row>
        <Col span="24" style="text-align: left;margin-bottom: 10px;">
            <query-item @ok="ok3" @cancel="cancel3"></query-item>
            <Button type="primary" @click="modal = true;houseId = ''">新增</Button>
        </Col>
        <Col span="24">
            <Table size="small" border :columns="columns1" :data="data1"></Table>
            <Page
            size="small"
            style="float: right;margin-top: 10px;"
            :current="start" 
            :page-size="length" 
            :total="total" 
            show-elevator 
            show-total
            show-sizer
            @on-change="changepage"
            @on-page-size-change="changepageSize"/>
        </Col>
        <Modal
            v-model="modal"
            title="新增/修改"
            :styles="{ width: '50%', top: '5%', height: '80%', overflow: 'auto'}"
            :mask="false"
            @on-visible-change="modal_change"
            footer-hide>
            <component v-bind:is="component" :houseId="houseId" @ok="saveHouse" @cancel="cancel"></component>
        </Modal>
        <Modal
            v-model="modal2"
            title="提示"
            @on-ok="ok2">
            <p>确定要删除该条任务？</p>
        </Modal>
    </Row>
</template>
<script>
import {get_house_list, add_house, upDate_house, delete_house, getHouse} from '@/api/house';
import addHouseModal from '_c/modal/add-house';
import {parseTime} from '@/lib/tool.js';
import queryItem from './query.vue';
export default {
    components: {addHouseModal, queryItem},
    data () {
        return {
            columns1: [
                {
                    title: '序号',
                    align: 'center',
                    width: 50,
                    render: (h, params) => {
                        return h('span', params.index + (this.start - 1) * this.length + 1)
                    }
                },
                {
                    title: '小区',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '套数',
                    key: 'number',
                    align: 'center'
                },
                {
                    title: '区域',
                    key: 'area',
                    align: 'center'
                },
                {
                    title: '开盘时间',
                    key: 'startTime',
                    align: 'center',
                    render: (h, {row}) => {
                        return h("span", parseTime(row.startTime, '{y}-{m}-{d}'))
                    }
                },
                {
                    title: '单价',
                    key: 'price',
                    align: 'center'
                },
                {
                    title: '地址',
                    key: 'addr',
                    align: 'center'
                },
                {
                    title: '状态',
                    align: 'center',
                    render: (h, {row}) => {
                        switch (Number(row.status)) {
                            case 0:
                                return h("span",{
                                    style:{
                                        color:'#FE5363',
                                        fontWeight: '700'
                                    }, 
                                },'即将报名')
                                break;
                            case 1:
                                return h("span",{
                                    style:{
                                        color:'#3CBC95',
                                        fontWeight: '700'
                                    }, 
                                },'正在报名')
                                break;
                            case 2:
                                return h("span",{
                                    style:{
                                        color:'#8B8B8B',
                                        fontWeight: '700'
                                    }, 
                                },'报名结束')
                                break;
                        }
                    }
                },
                {
                    title: '备注',
                    key: 'remark',
                    align: 'center'
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, {row}) => {
                        return h('div', [
                            h('a', {
                                on: {
                                    click: () => {
                                        this.houseId = row.id
                                        this.modal = !this.modal
                                    }
                                }
                            }, '修改'),
                            h('a', {
                                style: {
                                    marginLeft: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.houseId = row.id
                                        this.modal2 = !this.modal2
                                    }
                                }
                            }, '删除'),
                        ])
                    }
                }
            ],
            data1: [],
            total: 0,
            start: 1,
            length: 10,
            modal: false,
            modal2: false,
            component: null,
            houseId: '',
            queryParams: {
                name: '',
                status: '',
                date: ''
            }
        }
    },
    methods: {
        changepage (start) {
            this.start = start
            this.getHouse()
        },
        changepageSize (length) {
            this.length = length
            this.getHouse()
        },
        modal_change (val) {
            if (val) {
                this.component = 'addHouseModal'
            } else {
                this.component = null
            }
        },
        saveHouse (obj) {
            if (this.houseId) {
                // 更新用户
                this.upDate_house({
                    ...obj,
                    id: this.houseId
                })
            } else {
                // 新增用户
                this.add_house(obj)
            }
        },
        cancel (val) {
            this.modal = val
        },
        ok2 () {
            this.delete_house({
                id: this.houseId
            })
        },
        cancel3 () {
            this.modal2 = false
        },
        ok3 (params) {
            this.start = 1;
            this.queryParams = {...params};
            this.getHouse();
        },
        cancel3 () {
            this.start = 1;
            this.length = 10;
            this.queryParams = {
                name: '',
                status: '',
                date: ''
            }
            this.getHouse()
        },
        // 获取用户
        async get_house_list (start, length) {
            this.data1 = []
            try {
                const {status, msg, code, data: {data, iTotalDisplayRecords}} = await get_house_list({
                    start: (start - 1) * length,
                    length: length
                })
                this.data1 = data
                this.total = iTotalDisplayRecords
            } catch (error) {
                console.log(error)
            }
        },
        // 新增用户
        async add_house (params) {
            let obj = JSON.parse(JSON.stringify(params));
            obj.startTime = parseTime(obj.startTime, '{y}-{m}-{d} {h}:{i}:{s}');
            try {
                const {status, msg, code, data} = await add_house(obj);
                this.$Message.success(msg)
                this.modal = false
                this.getHouse()
            } catch (error) {
                console.log(error)
            }
        },
        // 更新用户
        async upDate_house (params) {
            let obj = JSON.parse(JSON.stringify(params));
            obj.startTime = parseTime(obj.startTime, '{y}-{m}-{d} {h}:{i}:{s}');
            try {
                const {status, msg, code, data} = await upDate_house(obj)
                this.$Message.success(msg)
                this.getHouse()
                this.modal = false
            } catch (error) {
                console.log(error)
            }
        },
        // 删除用户
        async delete_house (params) {
            try {
                const {status, msg, code, data} = await delete_house(params)
                this.$Message.success(msg)
                this.getHouse()
            } catch (error) {
                console.log(error)
            }
        },
        // 多参数查询
        async getHouse () {
            try {
                const {status, msg, code, data: {data, iTotalDisplayRecords}} = await getHouse({
                    ...this.queryParams,
                    start: (this.start - 1) * this.length,
                    length: this.length
                });
                this.data1 = data;
                this.total = iTotalDisplayRecords;
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted () {
        this.getHouse()
    }
}
</script>