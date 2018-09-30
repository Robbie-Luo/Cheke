var appid = "wx3b5beedc2c9e8715"; //应用ID，微信开放平台审核通过的应用APPID
var mch_id = "1503068211"; //商户号 微信支付分配的商户号
var notify_url = "https://api.mch.weixin.qq.com/pay/unifiedorder"; //通知地址 接收微信支付异步通知回调地址，通知url必须为直接可访问的url，不能携带参数。
// var out_trade_no = getNoncestr() //商户订单号 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*且在同一个商户号下唯一。详见商户订单号
var key = "Cheke123456Cheke123456Cheke12345"; //注：key为商户平台设置的密钥key
function getInfo_weiXinPay(out_trade_no, noncestr, timestamp, total_fee, spbill_create_ip, title) {
    var info_weiXinPay = "appid=" + appid; //应用ID，微信开放平台审核通过的应用APPID
    info_weiXinPay += ("&attach=" + title); //附加数据(不必要)，
    info_weiXinPay += ("&body=车客" + title); //商品描述 商品描述交易字段格式根据不同的应用场景按照以下格式：
    //APP——需传入应用市场上的APP名字-实际商品名称，天天爱消除-游戏充值。
    info_weiXinPay += "&mch_id=" + mch_id; //商户号 微信支付分配的商户号
    info_weiXinPay += "&nonce_str=" + noncestr; //随机字符串 随机字符串，不长于32位。推荐随机数生成算法
    info_weiXinPay += "&notify_url=" + notify_url; //通知地址 接收微信支付异步通知回调地址，通知url必须为直接可访问的url，不能携带参数。
    info_weiXinPay += "&out_trade_no=" + out_trade_no; //商户订单号 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*且在同一个商户号下唯一。详见商户订单号
    info_weiXinPay += "&spbill_create_ip=" + spbill_create_ip; //终端IP 用户端实际ip
    info_weiXinPay += "&total_fee=" + total_fee; //总金额 订单总金额，单位为分，详见支付金额
    info_weiXinPay += "&trade_type=APP"; //交易类型  支付类型
    var packageInfoSign = info_weiXinPay + "&key=" + key; //注：key为商户平台设置的密钥key
    packageInfoSign = $.md5(packageInfoSign).toUpperCase();
    info_weiXinPay = "<xml><appid>" + appid + "</appid>"; //应用ID，微信开放平台审核通过的应用APPID
    info_weiXinPay += "<attach>" + title + "</attach>"; //附加数据(不必要)，
    info_weiXinPay += "<body>车客" + title + "</body>"; //商品描述 商品描述交易字段格式根据不同的应用场景按照以下格式：
    //APP——需传入应用市场上的APP名字-实际商品名称，天天爱消除-游戏充值。
    info_weiXinPay += "<mch_id>" + mch_id + "</mch_id>"; //商户号 微信支付分配的商户号
    info_weiXinPay += "<nonce_str>" + noncestr + "</nonce_str>"; //随机字符串 随机字符串，不长于32位。推荐随机数生成算法
    info_weiXinPay += "<notify_url>" + notify_url + "</notify_url>"; //通知地址 接收微信支付异步通知回调地址，通知url必须为直接可访问的url，不能携带参数。
    info_weiXinPay += "<out_trade_no>" + out_trade_no + "</out_trade_no>"; //商户订单号 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*且在同一个商户号下唯一。详见商户订单号
    info_weiXinPay += "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>"; //终端IP 用户端实际ip
    info_weiXinPay += "<total_fee>" + total_fee + "</total_fee>"; //总金额 订单总金额，单位为分，详见支付金额
    info_weiXinPay += "<trade_type>APP</trade_type>"; //交易类型  支付类型
    info_weiXinPay += "<sign>" + packageInfoSign + "</sign></xml>"; //签名 签名，详见签名生成算法
    //alert(JSON.stringify(info_weiXinPay));
    return info_weiXinPay;
}
function getNoncestr() {
    var timestamp = new Date().getTime();
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    timestamp = timestamp + Num;
    return timestamp;
}
WeiXinPay_PayOrder=function(orderid){
  'use strict'
  var noncestr = getNoncestr(); //防重发字符串，
  var timestamp = new Date().getTime();
  timestamp = parseInt(timestamp / 1000);
  var signatureInfoT = "appid=" + appid;
  signatureInfoT += "&noncestr=" + noncestr;
  signatureInfoT += "&package=" + 'Sign=WXPay';
  signatureInfoT += "&partnerid=" + mch_id;
  signatureInfoT += "&prepayid=" + orderid;
  signatureInfoT += "&timestamp=" + timestamp;
  signatureInfoT += "&key=" + key;
  signatureInfoT = $.md5(signatureInfoT).toUpperCase();
  var wxPay = api.require('wxPay');
  setTimeout(function(){
    wxPay.payOrder({
        apiKey: appid,
        mchId: mch_id,
        nonceStr: noncestr,
        orderId: orderid,
        package: 'Sign=WXPay',
        timeStamp: timestamp,
        sign: signatureInfoT
     }, function(ret, err) {
        var status = ret.status;
        api.sendEvent({
            name: 'PayOrder',
            extra: {
                status: status
            }
        });
    });
  },1000);

}
WeiXinPay_getOrderId = function(out_trade_no,total_fee_in, title) {
    'use strict'
    var demo = api.require('ipAddress');
    var spbill_create_ip;
    var total_fee = total_fee_in;
    var info_weiXinPay = {};
    var noncestr = getNoncestr(); //防重发字符串，
    var timestamp = new Date().getTime(); //订单时间戳
    timestamp = parseInt(timestamp / 1000);
    var info_weiXinPay;
    demo.getIp(function(ret, err) {
        if (ret.status) {
            spbill_create_ip = ret.ip;
            info_weiXinPay = getInfo_weiXinPay(out_trade_no,noncestr, timestamp, total_fee, spbill_create_ip, title);
            var wxPay = api.require('wxPay');
            wxPay.getOrderId({
                info: info_weiXinPay
            }, function(ret, err) {
              api.sendEvent({
                  name: 'OrderInfo',
                  extra: {
                      OrderInfo: ret
                  }
              });
            });
        }
    });
}
