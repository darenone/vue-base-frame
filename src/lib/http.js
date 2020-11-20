import axios from 'axios'
import qs from 'qs'
import { Message } from 'view-design'
import {isShowPrompt} from './util'

const SERVER_URL = '/api/'

const GLOBAL_ERROR_MAP = {
    '0': {
        msg: '数据加载异常'
    },
    '-1': {
        process (err) {
            Message.error(err)
        }
    },
    '401': {
        process () {
            Message.error('登录信息已过期，请重新登录')
            window.location.href = window.location.pathname + "#/login"
        }
    },
    '404': {
        process () {
            Message.error('你访问的接口不存在')
        }
    },
    '500': {
        process () {
            Message.error('服务器异常')
        }
    }
}

// 处理响应成功
const successFn = (resp, resolve, reject) => {
    if (resp.data.status == 1) {
        resolve(resp.data)
    } else {
        let errorProcess = GLOBAL_ERROR_MAP[resp.data.status]
        if (errorProcess) {
            if (isShowPrompt()) {
                reject(resp.data.msg)
                errorProcess.process(resp.data.msg)
            }
        }
    }
}

// 处理响应失败
const failFn = err => {
    if (err.response) {
        let code = err.response.status
        let errorProcess = GLOBAL_ERROR_MAP[code]
        if (errorProcess) {
            if (isShowPrompt()) {
                errorProcess.process()
            }
        }
    }
}

const http = {
    get (url, params) {
        return new Promise((resolve, reject) => {
            axios.get(SERVER_URL + url, qs.stringify(params)).then(resp => {
                successFn(resp, resolve, reject)
            }).catch(err => {
                failFn(err)
            })
        })
    },
    post (url, params) {
        let header = {
            'Content-Type':"application/json",
        }
        return new Promise((resolve, reject) => {
            axios.post(SERVER_URL + url, params, {headers: header}).then(resp => {
                successFn(resp, resolve, reject)
            }).catch(err => {
                failFn(err)
            })
        })
    }
}

const install = (Vue, options) => {
    Vue.prototype.$http = http
}

export default install