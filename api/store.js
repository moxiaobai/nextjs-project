import { Http } from './request'

/*
获取国家列表
*/
export async function getCountry (data) {
  const res = await Http({
    url: `/store/country`,
    method: 'post',
    data: {
      ...data
    }
  })
  return res.rspdata || []
}


/* 根据国家代码获取支付和商品配置信息 */
export async function getChannel (data) {
  const res = await Http({
    url: `/store/channel`,
    method: 'post',
    data: {
      ...data
    }
  })
  return res.rspdata || []
}

/*
* 获取商品列表
*/
export async function getGoods (data) {
  const res = await Http({
    url: `/store/goods`,
    method: 'post',
    data: {
      ...data
    }
  })
  return res.rspdata || []
}
