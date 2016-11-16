var express = require('express');
var router = express.Router();
var MD5 = require('MD5');
var xml2js = require('xml2js');
var utils = require('npm-utils-kingwell');
var APPID = 'wxe2ad8c364455262b';
var MCH_ID = '1409909802';
var SECRET = 'd119ef2dc7d07a5a0c476125e96a1552';
var openid = 'ogO4X0YTkNdBMyz2Ha6pIuk7OOOA';
var request = require('request');
var fs = require('fs');



/**
 *  随机字符串
 * @return {[type]} [description]
 */
function getNonceStr() {
	return Math.random().toString(36).substr(2, 15);
}
/**
 * 时间戳
 * @return {[type]} [description]
 */
function getTimesTamp() {
	return parseInt(new Date().getTime() / 1000) + '';
}

var WXPay = require('weixin-pay');


router.get('/unifiedorder', function(req, res, next) {
	var ip = req.ip.replace('::ffff:', '');

	// var wxpay = WXPay({
	// 	appid: APPID,
	// 	mch_id: MCH_ID,
	// 	partner_key: SECRET, //微信商户平台API密钥 
	// 	pfx: fs.readFileSync('data/apiclient_cert.p12'), //微信商户平台证书 
	// });
	// console.log('wxpay', wxpay);

	// wxpay.getBrandWCPayRequestParams({
	// 	openid: openid,
	// 	body: '公众号支付测试',
	// 	detail: '公众号支付测试',
	// 	out_trade_no: '20161116' + Math.random().toString().substr(2, 10),
	// 	total_fee: 1,
	// 	spbill_create_ip: ip,
	// 	notify_url: 'http://wxpay_notify_url'
	// }, function(err, result) {
	// 	res.send(result);
	// });
	var obj = {
		appid: APPID,
		mch_id: MCH_ID,
		nonce_str: getNonceStr(),
		sign: 0,
		sign_type: 'MD5',
		body: 'body',
		out_trade_no: '20152016',
		total_fee: 10,
		spbill_create_ip: ip,
		notify_url: 'https://web.huizecdn.com/',
		trade_type: 'JSAPI'
	};
	var htmlResult = [
		'<xml>',
		'   <appid>wx2421b1c4370ec43b</appid>',
		'   <attach>支付测试</attach>',
		'   <body>JSAPI支付测试</body>',
		'   <mch_id>10000100</mch_id>',
		'   <detail><![CDATA[{ "goods_detail":[ { "goods_id":"iphone6s_16G", "wxpay_goods_id":"1001", "goods_name":"iPhone6s 16G", "quantity":1, "price":528800, "goods_category":"123456", "body":"苹果手机" }, { "goods_id":"iphone6s_32G", "wxpay_goods_id":"1002", "goods_name":"iPhone6s 32G", "quantity":1, "price":608800, "goods_category":"123789", "body":"苹果手机" } ] }]]></detail>',
		'   <nonce_str>1add1a30ac87aa2db72f57a2375d8fec</nonce_str>',
		'   <notify_url>http://wxpay.weixin.qq.com/pub_v2/pay/notify.v2.php</notify_url>',
		'   <openid>oUpF8uMuAJO_M2pxb1Q9zNjWeS6o</openid>',
		'   <out_trade_no>1415659990</out_trade_no>',
		'   <spbill_create_ip>14.23.150.211</spbill_create_ip>',
		'   <total_fee>1</total_fee>',
		'   <trade_type>JSAPI</trade_type>',
		'   <sign>0CB01533B8C1EF103065174F50BCA001</sign>',
		'</xml>'
	].join('');
	var b = new xml2js.Builder();
	var xml = b.buildObject(obj);
	console.log(xml);
	request({
		url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
		method: 'post',
		data: xml,
	}, function(err, response, body) {
		res.send(response);
	});

});


/**
 * 签名方法
 * @return {String} 签名字符串
 */

function sign(options) {
	console.log('\n\n');
	var ops = options || {};
	var requestObj = {
		appId: ops.appId,
		nonceStr: ops.nonceStr,
		package: ops.package || 'prepay_id=10034214',
		signType: ops.signType || 'MD5',
		timeStamp: ops.timeStamp
	};
	var sign = '';
	var str = '';
	var strArr = [];
	requestObj = utils.objectSort(requestObj);

	for (var key in requestObj) {
		strArr.push(key + '=' + requestObj[key]);
	}

	strArr.push('key=' + SECRET);
	str = strArr.join('&');
	sign = MD5(str).toUpperCase();

	return sign;
}
console.log(sign({
	appId: APPID,
	nonceStr: getNonceStr(),
	timeStamp: getTimesTamp(),
}));

router.get('/', function(req, res, next) {



	var result = {};
	var totalFee = 1;
	var _str = getNonceStr();
	var _time = getTimesTamp();

	var requestObj = {
		appid: APPID,
		body: '测试',
		mch_id: MCH_ID,
		nonce_str: _str,
		time_stamp: _time,
		total_fee: totalFee
	};


	var sign = '';
	var str = '';
	var strArr = [];
	for (var key in requestObj) {
		strArr.push(key + '=' + requestObj[key]);
	}
	strArr.push('key=' + SECRET);
	str = strArr.join('&');
	sign = MD5(str).toUpperCase();



	result.package = 'prepay_id=2015';
	result.sign = sign;
	result.timeStamp = _time;
	result.nonceStr = _str;
	result.signType = 'MD5';
	result.totalFee = totalFee;

	var obj = {
		appid: APPID,
		mch_id: MCH_ID,
		nonce_str: _str,
		sign: sign,
		sign_type: 'MD5',
		body: 'app test',
		total_fee: totalFee,
		trade_type: 'APP',
		out_trade_no: '20150806125346',
		notify_url: 'https://web.huizecdn.com/'
	};


	res.send(result);

});

module.exports = router;