    'use strict'

    const titbit = require('titbit')
    const {cookie,session} = require('titbit-toolkit')
    const app = new titbit({
        debug:true
    })

    app.use((new cookie()).mid())

    //一定要再cookie之后，session是基于cookie的
    app.use((new session()).mid())

    app.use(async (c,next) => {
        console.log('just for home')
        await next()
        //
    },{group: 'home'})

    app.get('/',async c => {
        c.res.body = 'lixiangyu'+' '+ 'success'
    },{name : '首页', group: 'home'})

    app.get('/cookie',async c => {
        c.res.body =c.headers['cookie'] || '还没有设置cookie'
    })


    app.get('/login',async c => {
        c.res.body = `<!DOCTYPE html><html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <form action="/login" method="post">
                    <input type="text" name="username">
                    <input type="password" name="passwd">
                    <input type="submit" name="Login">
                </form>
            </body>
        </html>`
    })

    app.post('/login',async c => {

        //提交数据解析到c.body
        console.log(c.body)

        c.res.body = c.body
    })
    app.use(async (c,next) => {
        
        //设置最大提交允许10字节
        // c.maxBody = 10
        await next()
        //设置pre为true等效于使用app.pre，提供method指定针对哪些请求方法执行
    },{pre:true,method:['POST','PUT']})



    app.post('/test',async c => {
        
        let{username,passwd} = c.body
        
        if (username === 'testuser' && passwd === '123456'){
            c.setSession('is_login',true)
            //跳转成功直接到首页
            c.status(301)
            c.setHeader('Location','/')
        }else{
            //
            c.status(301)
            c.setHeader('Location','/login')
        }
    })

    app.run(1236)
