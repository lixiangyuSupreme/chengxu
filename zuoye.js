'use strict'

const titbit = require('titbit')
const app = new titbit({
    debug:true
})

app.get('/',async c => {
    c.res.body = 'lixiangyu'+' '+ 'success'
},{name : '首页', group: 'home'})

app.get('/info',async c => {
    c.res.body ='{"name":"lixiangyu","sno":"2018011802"}'
})
app.run(1236)

