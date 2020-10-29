'use strict';

const gohttp = require('gohttp')
const wxkey = require('./wxkey')

//格式化access_token URL
function fmtTokenUrl (appid, secret) {
    return `https://api.weixin.qq.com/cgi-bin/token`
            + `?grant_type=client_credential`
            + `&appid=${appid}&secret=${secret}`;
}

exports.getToken = async function ()  {

    let api_url = fmtTokenUrl(wxkey.appid,wxkey.secret);

    let ret = await gohttp.get(api_url).then(res => {
        return ret;
    });
};