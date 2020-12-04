<template>
    <Row>
        <Col span="24" style="text-align: left;">
            1. <a href="https://zw.cdzj.chengdu.gov.cn/lottery/accept/index" target="_blank">商品住房购房登记系统</a><br>
            2. <a href="http://www.cdgzc.com/gongshigonggao" target="_blank">摇号结果查询</a>
            <Input v-model="userAccount" placeholder="请输入登录账号"></Input>
            <Button type="primary" @click="create">验证</Button>
            <p>{{pwdStr}}</p>
        </Col>
    </Row>
</template>
<script>
export default {
    data () {
        return {
            pwdList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','m','n','p','Q','r','s','t','u','v','w','x','y','z','2','3','4','5','6','7','8','9'],
            pwdStr: '',
            userAccount: ''
        }
    },
    methods: {
        create () {
            // this.pwdStr = '';
            // for (let i = 0; i < 6; i++) {
            //     let j = Math.floor(Math.random() * this.pwdList.length);
            //     this.pwdStr += this.pwdList[j]
            // }
            const reg = /^[0-9A-Za-z]{6}$/
            if (reg.test(this.userAccount)) {
                this.$Message.info('符合要求')
            } else {
                this.$Message.info('输入由6位数字或字母组成的密码')
            }
        }
    }
}
</script>