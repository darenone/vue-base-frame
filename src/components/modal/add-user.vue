<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="城市" prop="city">
            <Select v-model="formValidate.city" placeholder="请选择城市">
                <Option v-for="(item, index) in provinceList" :key="index" :value="item.orgCode">{{item.orgName}}</Option>
            </Select>
        </FormItem>
        <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formValidate.sex">
                <Radio :label="0">男</Radio>
                <Radio :label="1">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="手机号" prop="tel">
            <Input v-model="formValidate.tel" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="地址" prop="addr">
            <Input v-model="formValidate.addr" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入详细地址"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
import {getUserById} from '@/api/user'
import sysOrgList from '@/assets/json/sysOrgList.json'
const {data: provinceList} = sysOrgList
export default {
    props: {
        userId: ''
    },
    data () {
        const validateGender = (rule, value, callback) => {
            callback()
        }
        return {
            formValidate: {
                name: '',
                city: '',
                sex: 0,
                tel: '',
                addr: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                city: [
                    { required: true, message: '请选择城市', trigger: 'change' }
                ],
                sex: [
                    { required: true, validator: validateGender, trigger: 'change' }
                ],
                tel: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                addr: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                    { type: 'string', max: 100, message: '输入不能操作100个字符', trigger: 'blur' }
                ]
            },
            provinceList: provinceList
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit('ok', this.formValidate)
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
            this.$emit('cancel', false)
        },
        // 查询用户详情
        async getUserById (params) {
            this.userInfo = {}
            try {
                const {status, msg, code, data} = await getUserById(params)
                this.formValidate = {...data}
            } catch (error) {
                console.log(error)
            }
        },
    },
    mounted () {
        if (this.userId) {
            this.getUserById({
                id: this.userId
            })
        }
    },    
}
</script>