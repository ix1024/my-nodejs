var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Activity = require('../../routes/model/all-activity');
var ActivityUser = require('../../routes/model/activity-user');
var Tepmlate = require('../../routes/model/tepmlate');


router.get('/', function(req, res, next) {
	next();
});
router.get('/get', function(req, res, next) {

	Activity
		.find()
		.sort({
			createDate: -1
		})
		.exec(function(err, docs) {
			res.send(docs);
		});

});
router.get('/get/:id', function(req, res, next) {
	var id = req.params.id;
	Activity.findOne({
		_id: id
	}, function(err, docs) {
		res.send(docs);
	});
});
router.get('/my/:id', function(req, res, next) {
	var id = req.params.id;
	Activity.find({
			nickName: id
		})
		.sort({
			createDate: -1
		})
		.exec(function(err, docs) {
			res.send(docs);
		});
});
router.get('/update/:id', function(req, res, next) {
	var banner = req.query.banner;
	var id = req.params.id;
	var description = req.query.description;
	if (!description) {
		//return;
	}
	Activity.update({
		_id: '58296ec2de412850fd6c323d'
	}, {
		images: [
			"https://web.huizecdn.com/file/a1846b514dbdaddfd51bcdff140f13b3.png",
			"https://web.huizecdn.com/file/c1a2d47a10f0e46566a8626d877d842f.jpeg"
		],
	}, function(err, result) {
		res.send(result);
	});
});
router.get('/add', function(req, res, next) {
	var activity, addObj = req.query;
	addObj.images = addObj.images.split(',');
	activity = new Activity(addObj);
	activity.save(function(err, result) {
		res.send(result);
	});
});

router.get('/delete/:id', function(req, res, next) {
	var id = req.params.id;
	Activity.remove({
		_id: id
	}, function(err, result) {
		res.send(result);
	});
});
router.get('/add-tpl', function(req, res, next) {

	var tepmlate;
	var name = req.query.name;
	var image = req.query.image;
	if (!image && !name) {
		res.send('缺少参数');
	}
	tepmlate = new Tepmlate({
		name: name,
		image: image,
	});
	tepmlate.save(function(err, result) {
		res.send(result);
	})

});
router.get('/get-tpl', function(req, res, next) {

	Tepmlate
		.find()
		.sort({
			createDate: -1
		})
		.exec(function(err, docs) {
			res.send(docs);
		});
});
router.get('/update-tpl-num/:id', function(req, res, next) {
	var id = req.params.id;
	Tepmlate.findOne({
		_id: id
	}, function(err, doc) {


		Tepmlate.update({
			_id: id
		}, {
			total: doc.total + 1
		}, function(err, result) {
			res.send(result);
		});
	});

});
router.get('/activity-user/delete/:id', function(req, res, next) {
	var id = req.params.id;
	ActivityUser.remove({
		activityId: id
	}, function(err, result) {
		res.send(result);
	});
});
router.get('/activity-user', function(req, res, next) {
	ActivityUser.find({}, function(err, docs) {
		res.send(docs);
	});
});
router.get('/activity-user/:id', function(req, res, next) {
	var id = req.params.id;
	ActivityUser.find({
		activityId: id
	}, function(err, doc) {
		console.log('/activity-user/:id', err, doc);

		if (err) {
			res.send('error');
		} else {
			res.send(doc);
		}
	});
});
router.get('/baomin/:id', function(req, res, next) {
	var id = req.params.id;
	var nickName = req.query.nickName;
	var nickName = req.query.nickName;
	Activity.findOne({
		_id: id
	}, function(err, doc) {

		var number = doc.number;
		var total = doc.total;
		console.log('报名', number, total);
		if (number < total) {
			Activity.update({
				_id: id
			}, {
				number: number + 1
			}, function(err, result) {
				console.log(result);
				var activityUser = new ActivityUser({
					activityId: id,
					avatarUrl: req.query.avatarUrl,
					name: req.query.nickName
				});
				activityUser.save(function(err, result) {
					res.send(result);
				});
			});
		} else {
			res.send('已经超过最大数');
		}
	});
});
module.exports = router;