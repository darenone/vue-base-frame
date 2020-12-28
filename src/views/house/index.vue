<template>
    <Row>
        <Col span="24" style="text-align: left;margin-bottom: 10px;">
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
            :styles="{ width: '50%', top: '5%', height: '80%'}"
            :mask="false"
            @on-visible-change="modal_change"
            footer-hide>
            <component v-bind:is="component" :houseId="houseId" @ok="saveHouse" @cancel="cancel"></component>
        </Modal>
        <Modal
            v-model="modal2"
            title="提示"
            @on-ok="ok2"
            @on-cancel="cancel2">
            <p>确定要删除该条任务？</p>
        </Modal>
    </Row>
</template>
<script>
import {get_house_list, add_house, upDate_house, delete_house} from '@/api/house';
import addHouseModal from '_c/modal/add-house';
import {parseTime} from '@/lib/tool.js';
export default {
    components: {addHouseModal},
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
            houseId: ''
        }
    },
    methods: {
        changepage (start) {
            this.start = start
            this.get_house_list(this.start, this.length)
        },
        changepageSize (length) {
            this.length = length
            this.get_house_list(this.start, this.length)
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
        cancel2 () {
            this.modal2 = false
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
                this.get_house_list(this.start, this.length)
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
                this.get_house_list(this.start, this.length)
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
                this.get_house_list(this.start, this.length)
            } catch (error) {
                console.log(error)
            }
        },
    },
    mounted () {
        this.get_house_list(this.start, this.length)
    }
}
</script>