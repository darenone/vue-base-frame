<template>
    <Row>
        <Col span="24" style="text-align: left;margin-bottom: 10px;">
            <Button type="primary" @click="modal = true;userId = ''">新增</Button>
        </Col>
        <Col span="24">
            <Table border :columns="columns1" :data="data1"></Table>
            <Page
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
            :styles="{ width: '60%'}"
            :mask="false"
            @on-visible-change="modal_change"
            footer-hide>
            <component v-bind:is="component" :userId="userId" @ok="saveUser" @cancel="cancel"></component>
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
import {getUserList, addUser, getUserById, upDateUser, deleteUser} from '@/api/user'
import addUserModal from '_c/modal/add-user'
export default {
    components: {addUserModal},
    data () {
        return {
            columns1: [
                {
                    title: '序号',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', params.index + (this.start - 1) * this.length + 1)
                    }
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '性别',
                    align: 'center',
                    render: (h, {row}) => {
                        if (row.sex == 1) {
                            return h('span', '女')
                        } else if (row.sex == 0) {
                            return h('span', '男')
                        }
                    }
                },
                {
                    title: '城市',
                    key: 'city',
                    align: 'center'
                },
                {
                    title: '地址',
                    key: 'addr',
                    align: 'center'
                },
                {
                    title: '手机号',
                    key: 'tel',
                    align: 'center'
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, {row}) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                on: {
                                    click: () => {
                                        this.userId = row.id
                                        this.modal = !this.modal
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error'
                                },
                                style: {
                                    marginLeft: '10px'
                                },
                                on: {
                                    click: () => {
                                        this.userId = row.id
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
            userId: ''
        }
    },
    methods: {
        changepage (start) {
            this.start = start
            this.getUserList(this.start, this.length)
        },
        changepageSize (length) {
            this.length = length
            this.getUserList(this.start, this.length)
        },
        modal_change (val) {
            if (val) {
                this.component = 'addUserModal'
            } else {
                this.component = null
            }
        },
        saveUser (obj) {
            if (this.userId) {
                // 更新用户
                this.upDateUser({
                    ...obj,
                    id: this.userId
                })
            } else {
                // 新增用户
                this.addUser(obj)
            }
        },
        cancel (val) {
            this.modal = val
        },
        ok2 () {
            this.deleteUser({
                id: this.userId
            })
        },
        cancel2 () {
            this.modal2 = false
        },
        // 获取用户
        async getUserList (start, length) {
            this.data1 = []
            try {
                const {status, msg, code, data: {data, iTotalDisplayRecords}} = await getUserList({
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
        async addUser (params) {
            try {
                const {status, msg, code, data} = await addUser(params)
                this.$Message.success(msg)
                this.modal = false
                this.getUserList(this.start, this.length)
            } catch (error) {
                console.log(error)
            }
        },
        // 更新用户
        async upDateUser (params) {
            try {
                const {status, msg, code, data} = await upDateUser(params)
                this.$Message.success(msg)
                this.getUserList(this.start, this.length)
                this.modal = false
            } catch (error) {
                console.log(error)
            }
        },
        // 删除用户
        async deleteUser (params) {
            try {
                const {status, msg, code, data} = await deleteUser(params)
                this.$Message.success(msg)
                this.getUserList(this.start, this.length)
            } catch (error) {
                console.log(error)
            }
        },
    },
    mounted () {
        this.getUserList(this.start, this.length)
    }
}
</script>