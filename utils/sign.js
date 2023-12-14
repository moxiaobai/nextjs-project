import md5 from "blueimp-md5";

//排序的函数
export function objKeySort (arys) {
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  let newkey = Object.keys(arys).sort();
  //console.log('newkey='+newkey);
  let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = arys[newkey[i]];
    //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
}

/**
 * 签名处理
 * @param reqdata
 * @returns {string}
 */
export function signFormat (reqdata = {}, timestamp) {
  const appId = process.env.NEXT_PUBLIC_APP_ID
  const appKey = process.env.NEXT_PUBLIC_APP_KEY

  let param = {
    clientversion: '2.1',
    appid: appId,
    securemode: "MD5",
    timestamp: timestamp,
  };
  //对业务参数进行urlEncode
  param.reqdata = encodeURIComponent(JSON.stringify(reqdata));
  //对所有参数进行排序
  let sortParam = objKeySort(param);
  let beforeMd5 = JSON.stringify(sortParam) + appKey;
  //console.log(beforeMd5)
  //把sign塞入请求参数
  param.sign = md5(beforeMd5);
  return JSON.stringify(param);
}

/**
 * 结果处理
 * @param rspdata
 * @returns {any}
 */
export function responseFormat (rspdata) {
  return rspdata ? JSON.parse(decodeURIComponent(rspdata.replace(/\+/g, ' '))) : '';
}

