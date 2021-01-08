<template>
    <Form :model="formItem" :label-width="90" style="width: 50%;">
        <FormItem label="成交价">
            <Input v-model="formItem.price1" placeholder="成交价"></Input>
        </FormItem>
        <FormItem label="银行评估价">
            <Input v-model="formItem.price2" placeholder="银行评估价"></Input>
        </FormItem>
        <FormItem label="房管局指导价">
            <Input v-model="formItem.price3" placeholder="房管局指导价"></Input>
        </FormItem>
        <FormItem label="核税价">
            <div style="overflow: hidden;">
                <Input v-model="formItem.price4" placeholder="核税价" style="margin-right: 200px;display: block;width: auto;"></Input>
                <p style="position: absolute;right: 0;top: 0;font-size: 12px;color:#808695;line-height: 14px;">评估价＞指导价，核税价=评估价<br/>评估价＜指导价，核税价=指导价</p>
            </div>
        </FormItem>
        <FormItem label="是否是首套（契税利率）">
            <RadioGroup v-model="formItem.houseMore">
                <Radio :label="0">首套<span style="font-size: 10px;color: #808695;">≤90㎡ 1%</span></Radio>
                <Radio :label="1">首套<span style="font-size: 10px;color: #808695;">＞90㎡ 1.5%</span></Radio>
                <Radio :label="2">二套<span style="font-size: 10px;color: #808695;">≤90㎡ 1%</span></Radio>
                <Radio :label="3">二套<span style="font-size: 10px;color: #808695;">＞90㎡ 2%</span></Radio>
                <Radio :label="4">三套及以上<span style="font-size: 10px;color: #808695;">≤90㎡ 3%</span></Radio>
                <Radio :label="5">三套及以上<span style="font-size: 10px;color: #808695;">＞90㎡ 3%</span></Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="1.房地产契税">
            <div style="overflow: hidden;">
                <Input v-model="formItem.price5" placeholder="房地产契税" style="margin-right: 100px;display: block;width: auto;"></Input>
                <p style="position: absolute;right: 0;top: 0;font-size: 12px;color:#808695;">核税价*契税利率</p>
            </div>
        </FormItem>
        <FormItem label="是否满五年（个人所得税率）">
            <RadioGroup v-model="formItem.fiveYear">
                <Radio :label="0">满五且唯一<span style="font-size: 10px;color: #808695;">免收个人所得税</span></Radio>
                <Radio :label="1">其它<span style="font-size: 10px;color: #808695;">1%</span></Radio>
                <Radio :label="2">赠与/继承所得住宅<span style="font-size: 10px;color: #808695;">个人所得税=(成交价*上次合同价)*20%</span></Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="2.个人所得税">
            <div style="overflow: hidden;">
                <Input v-model="formItem.price6" placeholder="个人所得税" style="margin-right: 120px;display: block;width: auto;"></Input>
                <p style="position: absolute;right: 0;top: 0;font-size: 12px;color:#808695;">核税价*个人所得税率</p>
            </div>
        </FormItem>
        <FormItem label="契税开票日期或产权证是否满五年">
            <RadioGroup v-model="formItem.twoYear">
                <Radio :label="0">满五年<span style="font-size: 10px;color: #808695;">增值税率 0%</span></Radio>
                <Radio :label="1">不满五年<span style="font-size: 10px;color: #808695;">增值税率 5.6%</span></Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="3.增值税">
            <div style="overflow: hidden;">
                <Input v-model="formItem.price7" placeholder="增值税" style="margin-right: 120px;display: block;width: auto;"></Input>
                <p style="position: absolute;right: 0;top: 0;font-size: 12px;color:#808695;">核税价*增值税率</p>
            </div>
        </FormItem>
        <FormItem label="4.中介费">
            <div style="overflow: hidden;">
                <Input v-model="formItem.price8" placeholder="中介费" style="margin-right: 120px;display: block;width: auto;"></Input>
                <p style="position: absolute;right: 0;top: 0;font-size: 12px;color:#808695;">成交价*抽成点数</p>
            </div>
        </FormItem>
        <FormItem label="是否带电梯（维修基金单价）">
            <RadioGroup v-model="formItem.elevator">
                <Radio :label="0">带电梯<span style="font-size: 10px;color: #808695;">27.5元/㎡</span></Radio>
                <Radio :label="1">不带电梯<span style="font-size: 10px;color: #808695;">22元/㎡</span></Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="5.维修基金">
            <div style="overflow: hidden;">
                <Input v-model="formItem.price9" placeholder="维修基金" style="margin-right: 120px;display: block;width: auto;"></Input>
                <p style="position: absolute;right: 0;top: 0;font-size: 12px;color:#808695;">产权面积*维修基金单价</p>
            </div>
        </FormItem>
        <FormItem label="6.转移登记费">
            <Input v-model="formItem.price10" placeholder="转移登记费"></Input>
        </FormItem>
        <FormItem label="7.交易手续费">
            <div style="overflow: hidden;">
                <Input v-model="formItem.price11" placeholder="交易手续费" style="margin-right: 120px;display: block;width: auto;"></Input>
                <p style="position: absolute;right: 0;top: 0;font-size: 12px;color:#808695;">产权面积*4元/㎡</p>
            </div>
        </FormItem>
        <FormItem label="是否是经济适用房/安置房">
            <RadioGroup v-model="formItem.houseType">
                <Radio :label="0">出让<span style="font-size: 10px;color: #808695;">0</span></Radio>
                <Radio :label="1">划拨<span style="font-size: 10px;color: #808695;">2环内：核税总价*1.5%+20</span></Radio>
                <Radio :label="2">划拨<span style="font-size: 10px;color: #808695;">2环外：核税总价*1%+20</span></Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="8.土地出让金">
            <div style="overflow: hidden;">
                <Input v-model="formItem.price12" placeholder="土地出让金" style="margin-right: 120px;display: block;width: auto;"></Input>
            </div>
        </FormItem>
        <FormItem label="9.贷款服务费">
            <div style="overflow: hidden;">
                <Input v-model="formItem.price13" placeholder="贷款服务费" style="margin-right: 120px;display: block;width: auto;"></Input>
                <p style="position: absolute;right: 0;top: 0;font-size: 12px;color:#808695;"></p>
            </div>
        </FormItem>
        <FormItem label="贷款类型">
            <RadioGroup v-model="formItem.loanType">
                <Radio :label="0">商贷<span style="font-size: 10px;color: #808695;">免征</span></Radio>
                <Radio :label="1">公积金/组合贷<span style="font-size: 10px;color: #808695;">成交价*1%（最高不超过800元）</span></Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="10.贷款评估费">
            <Input v-model="formItem.price14" placeholder="贷款评估费"></Input>
        </FormItem>
        <FormItem label="11.抵押登记费">
            <div style="overflow: hidden;">
                <Input v-model="formItem.price15" placeholder="抵押登记费" style="margin-right: 180px;display: block;width: auto;"></Input>
                <p style="position: absolute;right: 0;top: 0;font-size: 12px;color:#808695;">商贷免征，公积金/组合贷为80元</p>
            </div>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="count">开始计算</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
    data () {
        return {
            formItem: {
                price1: 0,
                price2: 0,
                price3: 0,
                price4: 0,
                price5: 0,
                price6: 0,
                price7: 0,
                price8: 0,
                price9: 0,
                price10: 80,
                price11: 0,
                price12: 0,
                price13: 3000,
                price14: 0,
                price15: 0,
                houseMore: 0,
                fiveYear: 0,
                twoYear: 0,
                elevator: 0,
                houseType: 0,
                loanType: 0,
            }
        }
    },
    methods: {
        count () {
            // 计算核税价
            if (this.formItem.price2 > this.formItem.price3 || this.formItem.price2 == this.formItem.price3) {
                this.formItem.price4 = this.formItem.price2;
            } else {
                this.formItem.price4 = this.formItem.price3;
            }
            // 计算房地产契税
            switch (this.formItem.houseMore) {
                case 0:
                   this.formItem.price5 = this.formItem.price4 * 0.01;
                case 1:
                    this.formItem.price5 = this.formItem.price4 * 0.015;
                case 2:
                    this.formItem.price5 = this.formItem.price4 * 0.01;
                case 3:
                    this.formItem.price5 = this.formItem.price4 * 0.02;
                case 4:
                    this.formItem.price5 = this.formItem.price4 * 0.03;
                case 5:
                    this.formItem.price5 = this.formItem.price4 * 0.03;
            }
            // 计算个人所得税
            switch (this.formItem.fiveYear) {
                case 0:
                    this.formItem.price6 = this.formItem.price4 * 0;
                case 1:
                    this.formItem.price6 = this.formItem.price4 * 0.01;
                case 2:
                    this.formItem.price6 = this.formItem.price4 * 0;
            }
            // 计算增值税
            switch (this.formItem.twoYear) {
                case 0:
                    this.formItem.price7 = this.formItem.price4 * 0;
                case 1:
                    this.formItem.price7 = this.formItem.price4 * 0.056;
            }
            // 计算中介费
            this.formItem.price8 = this.formItem.price4 * 0.03;
            // 计算维修基金
            switch (this.formItem.elevator) {
                case 0:
                    this.formItem.price9 = 0;
                case 1:
                    this.formItem.price9 = 0;
            }
            // 计算交易手续费
            this.formItem.price11 = 0;
            // 计算土地出让金
            switch (this.formItem.houseType) {
                case 0:
                    this.formItem.price12 = this.formItem.price4 * 0;
                case 1:
                    this.formItem.price12 = this.formItem.price4 * 0.015 + 20;
                case 2:
                    this.formItem.price12 = this.formItem.price4 * 0.01 + 20;
            }
            // 计算贷款评估费
            switch (this.formItem.loanType) {
                case 0:
                    this.formItem.price14 = this.formItem.price1 * 0;
                case 1:
                    this.formItem.price14 = this.formItem.price1 * 0.01;
            }
        }
    }
}
</script>