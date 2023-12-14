import { Http } from './request'

/* 生成订单 */
export async function order (data) {
    const res = await Http({
        url: `/checkout/order`,
        method: 'post',
        data: {
            ...data
        }
    })
    return res.rspdata
}

/* 获取订单列表 */
export async function getRecord (data) {
    const res = await Http({
        url: `/checkout/record`,
        method: 'post',
        data: {
            ...data
        }
    })
    return res.rspdata
}

/* 支付结果 */
export async function getResult (data) {
    const res = await Http({
        url: `/checkout/result`,
        method: 'post',
        data: {
            ...data
        }
    })
    return res.rspdata
}