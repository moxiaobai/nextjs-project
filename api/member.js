import { Http } from './request'

/* 获取登录地址 */
export async function getLoginUrl (data) {
    const res = await Http({
        url: `/member/login`,
        method: 'post',
        data: {
            ...data
        }
    })
    return res
}

/* 退出登录 */
export async function logout (data) {
    const res = await Http({
        url: `/member/logout`,
        method: 'post',
        data: {
            ...data
        }
    })
    return res
}


/* 获取用户信息 */
export async function getMemberInfo (data) {
    const res = await Http({
        url: `/member/info`,
        method: 'post',
        data: {
            ...data
        }
    })
    return res
}


export async function getMemberTest () {
    const res = await Http({
        url: `/member/test`,
        method: 'post',
    })
    return res
}



