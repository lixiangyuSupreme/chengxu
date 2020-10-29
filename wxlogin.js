'use strict'

const titbit = require("titbit")
const wxkey = require('./wxkey')
const gohttp = require('gohttp')
const app = new titbit({
    debug:true
})
let token_key = '12345678912345678912345678912345'
app.get("/oauth-login",async c =>{
    let login_url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wxkey.appid}&secret=${wxkey.secret}&js_code=${c.query.code}&grant_type=authorization_code`
    let result = await gohttp.get(login_url)
    c.res.body = result.text()
    let r = result.json()
    if (r.openid === undefined){
        c.status(500)
        return
    }
    let info = {
        openid : r.openid,
        expires : 7200000,
        timestamp : Date.now(),
        random : Math.random()
    }
    let token = c.helper.aesEncrypt(JSON.stringify(info),token_key)
    c.res.body = token
})
app.get('/aes-test/:data',async c =>{
    c.res.body = c.helper.aesDecrypt(c.param.data,token_key)
})
app.run(1236)
