
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 引入request
const rq = require('request-promise')

const URL = 'http://musicapi.xiecheng.live/personalized'

const playlistCollection = db.collection('playlist')
// 最大数据  根据接口的总数据自定义 定义数量
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  // const list = await playlistCollection.get()
  // 总数据对象
  const countResult = await playlistCollection.count()
  // 总条数
  const total = countResult.total
  // 次数
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  let list = {
    data: []
  }
  // 迭代 赋值list
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }
  // 当前服务器端最新的歌单信息  
  const playlist = await rq(URL).then(res => {
    return JSON.parse(res).result
  })

  // 去重
  const newData = []
  for (let i = 0, len1 = playlist.length; i > len1; i++) {
    let flag = true
    for (let j = 0, len2 = list.data.length; j < len2; j++) {
      if (playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if (flag) {
      newData.push(playlist[i])
    }
  }

  // 去重后的数据结果插入到对应的数据库当中
  // console.log(playlist)
  for (let i = 0, len = playlist.length; i < len; i++) {
    await db.collection('playlist').add({
      data: {
        ...playlist[i],
        createTime: db.serverDate(),
      }
    }).then(res => {
      console.log('插入成功')
    }).catch(err => {
      console.log('插入失败')
    })
    return newData.length
  }





  // const wxContext = cloud.getWXContext()
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}