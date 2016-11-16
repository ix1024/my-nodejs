var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var multer = require('multer');
var ResFormat = require('res-format');
var resFormat = new ResFormat();
var fileType = ['application/pdf', 'application/javascript', 'image/png', 'image/gif', 'image/jpeg', 'application/x-zip-compressed', 'application/vnd.ms-excel', 'video/mp4'];

var utils = require('npm-utils-kingwell');
var upload = multer({
	limits: {
		fieldNameSize: 100, //field 名字最大长度
		fieldSize: 100, //field 值的最大长度
		files: 5,
		//fileSize: 1024 * 1024,
	},
	filename: function(req, file, cb) {
		console.log(1023);
		cb(null, file.fieldname + '-' + Date.now());
	},
	fileFilter: function(req, file, c) {

		console.log(file);
		var mimetype = file.mimetype;
		if (utils.inArray(mimetype, fileType) !== -1) {
			c(null, true);
		} else {
			c(null, false);
		}

	},
	dest: '../public/uploads/'
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	var _path = '../public/uploads/';
	var realPath = _path + id;
	var _mime = mime.lookup(realPath);
	var lastIndexOf = realPath.lastIndexOf('.');
	realPath = realPath.slice(0, lastIndexOf);

	fs.stat(realPath, function(err, stat) {
		if (err) {
			res.send(err);
		} else {
			if (stat.isFile()) {
				var stream = fs.createReadStream(realPath);
				res.setHeader("Content-Type", _mime);
				stream.pipe(res);
			} else {
				res.send({});
			}
		}

	});
});
var getFileType = function(str) {
	return {
		'vnd.ms-excel': 'xls',
		'javascript': 'js'
	}[str] || str;
};
var uploads = upload.any();
router.post('/upload', function(req, res, next) {
	console.log(req);
	uploads(req, res, function(err) {
		if (err) {
			res.send(err);
		} else {
			var obj = req.files.map(function(item) {
				delete item.destination;
				delete item.path;
				item.url = (req.headers.origin || req.headers.host) + req.baseUrl + '/' + item.filename + '.' + getFileType(item.mimetype.split('/')[1]);
				return item;
			});
			res.send(obj);
		}

	});

});
module.exports = router;