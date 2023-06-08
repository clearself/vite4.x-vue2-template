import request from '@/utils/server'

// 获取安全策略
export const get_security_policy = (data) => {
    return request({
        url: 'base-server/terminal/getUserConfig',
        method: 'post',
        params: data.queryData,
        data: data.paramsData
    })
}

// 登录
export const login = (data) => {
    return request({
        url: 'base-server/loginUser',
        method: 'post',
        params: data.queryData,
        data: data.paramsData
    })
}
// 忘记密码
export const forget = (data) => {
    return request({
        url: 'base-server/terminal/forgetPassword',
        method: 'post',
        params: data.queryData,
        data: data.paramsData
    })
}
// 退出登录
export const exit = (data) => {
    return request({
        url: 'base-server/exit',
        method: 'post',
        data: data
    })
}
// 发送验证码
export const sendVerifyCode = (data) => {
    return request({
        url: 'base-server/sendCode',
        method: 'post',
        params: data.queryData,
        data: data.paramsData
    })
}
