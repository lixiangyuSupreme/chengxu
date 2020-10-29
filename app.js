'use strict';

const titbit = require('titbit');

const app = new titbit({
    debug:true,
});

/**
 * {
 *  status : "OK",
 *  data : "正确的数据"
 * },
 * 
 * {
 *  status : "EFAILED",
 *  errmsg : "错误信息"
 * }
 */

app.get('/home',async c => {

    c.res.body = {
        status : "OK",
        //url中？后面的值解析到query,JSON键值对格式
        data : c.query
    }

});

//随机返回错误的测试接口
app.get('ramderr',async c =>{
    let n = parseInt(Math.random()*10);

    if (n > 6) {
        c.res.body = {
            status : 'EFAILED',
            errmsg : `出错了:${n}`
        };
    } else {
        c.res.body = {
            status : 'OK',
            data : n.
        };
    }
});
app.get('/p',async c => {
    //返回登录页面
    c.res.body = '....';
});

app.post('/p',async c=> {
    //返回提交的数据，提交的数据解析到body属性，JSON键值对模式  
    c.res.body = c.body;
});

app.daemon(1234);