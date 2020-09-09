/*
 * 将空数据显示为--
 * @params val {all} 需要处理的值
 * @params unit {String} 单位
 * @return {String} 处理后的值
 * @author 宗强 2020/09/09
 */
export function handleEmpty (val, unit) {
    if (val !== 0) {
        if (typeof val === 'undefined' || val === null || val === '' || val === 'null' || val === '--') {
            return '--'
        }
    }
    if (unit) {
        return val + unit
    } else {
        return val
    }
}
