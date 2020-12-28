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
/*
 * 格式化日期
 * @params time 需要处理的时间 time = '2020-12-24' or time = new Date() or tiem = 时间戳
 * @params cFormat 日期格式化的格式 cFormat = '{y}/{m}/{d}' or cFormat = '{y}' 或者不传
 * @return {String} 处理后的值
 * @author 宗强 2020/09/09
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    if (!time) return null
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        if (typeof(time) === 'number') {
            date = new Date(time)
        } else {
            date = new Date(time.replace(/-/g, '/').replace('T', ' ').replace('.000+0000', ''))
        }
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}
