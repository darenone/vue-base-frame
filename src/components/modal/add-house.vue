<template>
    <Form :model="formValidate" :label-width="80">
        <FormItem label="小区名">
            <Input v-model="formValidate.name" placeholder="输入小区名"></Input>
        </FormItem>
        <FormItem label="房源套数">
            <Input v-model="formValidate.number" placeholder="输入房源套数"></Input>
        </FormItem>
        <FormItem label="区域">
            <Select v-model="formValidate.areaCode">
                <Option v-for="(item, index) in areaList" :key="index" :value="item.value">{{item.label}}</Option>
            </Select>
        </FormItem>
        <FormItem label="开盘时间">
            <DatePicker type="date" placeholder="选择开盘时间" v-model="formValidate.startTime"></DatePicker>
        </FormItem>
        <FormItem label="单价">
            <Input v-model="formValidate.price" placeholder="输入单价"></Input>
        </FormItem>
        <FormItem label="地址">
            <Input v-model="formValidate.addr" placeholder="输入地址"></Input>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入备注"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">保存</Button>
            <Button style="margin-left: 8px" @click="handleReset">取消</Button>
        </FormItem>
    </Form> 
</template>
<script>
import {get_house_byId} from '@/api/house';
import {parseTime} from '@/lib/tool.js';
import sysOrgList from '@/assets/json/sysOrgList.json';
const {data: provinceList} = sysOrgList;
export default {
    props: {
        houseId: ''
    },
    data () {
        return {
            formValidate: {
                name: '',
                number: 0,
                areaCode: 0,
                startTime: new Date(),
                price: 0,
                addr: '',
                remark: ''
            },
            areaList: []
        }
    },
    methods: {
        handleSubmit () {
            this.$emit('ok', this.formValidate);
        },
        handleReset () {
            this.$emit('cancel', false);
        },
        // 查询用户详情
        async get_house_byId (params) {
            this.userInfo = {}
            try {
                const {status, msg, areaCode, data} = await get_house_byId(params)
                this.formValidate = {...data}
            } catch (error) {
                console.log(error)
            }
        },
    },
    mounted () {
        if (this.houseId) {
            this.get_house_byId({
                id: this.houseId
            })
        }
        provinceList.forEach(ele1 => {
            // 四川
            if (ele1.orgCode == 26) {
                ele1.children.forEach(ele2 => {
                    // 成都
                    if (ele2.cityCode == 2601) {
                        ele2.children.forEach(ele3 => {
                            this.areaList.push({
                                label: ele3.areaName,
                                value: ele3.areaCode
                            })
                        })
                    }
                })
            }
        });
    },
}
</script>