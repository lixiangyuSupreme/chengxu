const http = require('http');

let routeTable = {
    '/home' : (ctx) => {
        //ctx.res.write('not end');
        let html = `<!DOCTYPE html><html>

            <head>
                <meta charset="utf-8">
            </head>

            <body>
                <div style="width:80%;margin:auto;margin-top:1rem;">
                    home page success
                </div>
            </body>
        </html>`;
        ctx.res.setHeader('content-type','text/html;charset=utf-8');
        ctx.res.end(html);
        //ctx.res.end('home page success');
    },

    '/test':(ctx)=>{
        ctx.res.end('This is test page');
    },

    '/goto-home':(ctx)=>{
        ctx.res.statusCode = 301;
        ctx.res.setHeader('location','/home');
        ctx.res.end();
    },

    '/post' : (ctx) => {
        console.log(ctx.req.headers);
        console.log(ctx.body.toString());
        ctx.res.end('ok');
    }
};
//const { url } = require('inspector');

let serv = http.createServer((req,res)=>{

    

    // console.log(req.url);
    // console.log(req.headers);

    //切分字符串并过滤空字符
    let urlsplit = req.url.split('?').filter(p => p.length >0);
    let ctx={
        url : urlsplit[0],
        query : {}

    };
    if(urlsplit.length > 1){
        //解析querystring
        let qarr = urlsplit[1].split('&');
        let tmp = '';
        for(let i=0; i<qarr.length;i++){
            tmp = qarr.split('=').filter(p=>p.length>0);
            if(tmp.length > 0 ){
                ctx.query[ tmp[0] ] = tmp.length > 1 ? tmp[1] : '';
            }
        }
    }
    //测试输出
    // consolee.log(ctx);
    ctx.req = req;
    ctx.res = res;
    let requestCall = () =>{
        if(routeTable[ctx.url] === undefined){
            res.statusCode = 404;
            res.end('not found');
        }else{
            routeTable[ctx.url](ctx);
        }
    };

    let bodyData = null;
    let bodyBuffers = [];
    let bodyLength = 0;
    if(req.method === 'POST'){
        req.on('data',(chunk)=>{
            bodyLength += chunk.length;
            bodyBuffers.push(chunk);
        });
        req.on('end',()=>{
            bodyData = Buffer.concat(bodyBuffers,bodyLength);
            bodyBuffers = null;//释放保存的chunk
            ctx.body = bodyData;
            requestCall();
        });
    }else{
        req.on('data',chunk =>{

        });
        req.on('end',()=>{
            requestCall();
        });
    }

   
});

//相当于serv.listen(8000,'0.0.0.0')
serv.listen(8000);
