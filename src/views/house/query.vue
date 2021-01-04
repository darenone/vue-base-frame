<template>
    <Form :model="formItem" inline>
        <FormItem label="关键词">
            <Input v-model="formItem.name" clearable placeholder="输入小区名"></Input>
        </FormItem>
        <FormItem label="状态">
            <Select v-model="formItem.status" clearable placeholder="选择状态">
                <Option :value="0">即将报名</Option>
                <Option :value="1">正在报名</Option>
                <Option :value="2">报名结束</Option>
            </Select>
        </FormItem>
        <FormItem label="时间">
            <DatePicker type="month" placeholder="选择日期" v-model="formItem.date"></DatePicker>
        </FormItem>
        <FormItem style="margin-top: 33px;">
            <Button type="primary" @click="handleSubmit">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
import {parseTime} from '@/lib/tool.js';
export default {
    data () {
        return {
            formItem: {
                name: '',
                status: null,
                date: null,
            }
        }
    },
    methods: {
        handleSubmit () {
            this.$emit('ok', {
                name: this.formItem.name,
                status: this.formItem.status,
                date: parseTime(this.formItem.date, '{y}-{m}')
            })
        },
        reset () {
            this.formItem = {
                name: '',
                status: null,
                date: null,
            }
            this.$emit('cancel')
        }
    }
}
</script>