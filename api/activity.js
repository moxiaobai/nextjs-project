import { Http } from './request'

/* banner */
export function getBannerList () {
  return Http({
    url: `/activity/banner/list`,
    method: 'post',
  }).then(res => {
    return res
  })
}
