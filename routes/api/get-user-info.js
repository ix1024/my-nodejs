var express = require('express');
var router = express.Router();
var request = require('request');
var app = express();



// router.get('/session', function(req, res, next) {
// 	res.send(req.session);
// });

router.all('/', function(req, res, next) {
	var body = req.body;
	var SECRET = body.SECRET;
	var APPID = body.APPID;
	var code = body.code;

	request(
		'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + code + '&grant_type=authorization_code',
		function(error, response, body) {
			res.send(body);
		});


});
module.exports = router;