'use strict'

const titbit = require('titbit')

const app = new titbit({

    debug:true,

    globalLog:true,

})

//带参数路由
app.get('/user/:name/:age',async c => {

    let{name,age} = c.param

    console.log(name,age)

    //原样返回
    c.res.body = c.param

    console.log(c.name,c.group)

},{name: 'userinfo', group: 'user'})

//返回随机数
app.get('/rand/:start/:end',async c => {
    //解析后的参数都是字符串，数字也是字符串形式
    let start = parseInt(c.param.start)
    let end = parseInt(c.param.end)
    
    let nm = start + parseInt( Math.random()*(end - start) )

    c.res.body = nm

},'get-rand')

//url中的查询字符串解析到c.query
//上传的body数据解析到c.body

app.run(1234)