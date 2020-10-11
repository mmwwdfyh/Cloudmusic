// 云函数入口文件
const cloud = require('wx-server-sdk')

const TcbRouter = require('tcb-router')

const rq = require('request-promise')

const BASE_URL = 'http://musicapi.xiecheng.live'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

    const app = new TcbRouter({
        event
    })

    app.router('playlist', async (ctx, next) => {
        // 获取当前数据库  找到前面这个集合                                            排序
        ctx.body = await cloud.database().collection('playlist').skip(event.start).limit(event.count).orderBy('createTime', 'desc').get().then(res => {
            return res
        })

    })

    app.router('musiclist',async(ctx,next)=>{
      ctx.body = await rq(BASE_URL+'/playlist/detail?id='+parseInt(event.id)).then(res=>{
            return JSON.parse(res)
        })
    })

    return app.serve()

}