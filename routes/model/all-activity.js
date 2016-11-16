var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
var fixDate = function(number) {
	return number < 10 ? '0' + number : number;
};
var getDate = function() {
	var date = new Date();
	return date.getFullYear() + '-' + fixDate(date.getMonth() + 1) + '-' + fixDate(date.getDate());
};
var getTime = function() {
	var date = new Date();
	return date.getHours() + ':' + fixDate(date.getMinutes()) + ':' + fixDate(date.getSeconds());
};
var BlogPost = new Schema({
	id: ObjectId,
	author: {
		type: String,
		default: 'admin'
	},
	title: {
		type: String,
		default: ''
	},
	userName: {
		type: String,
		default: ''
	},
	avatarUrl: {
		type: String,
		default: ''
	},
	nickName: {
		type: String,
		default: ''
	},
	banner: {
		type: String,
		default: ''
	},
	total: {
		type: Number,
		default: 0
	},
	number: {
		type: Number,
		default: 0
	},
	tel: {
		type: Number,
		default: ''
	},
	startTime: {
		type: String,
		default: ''
	},
	endTime: {
		type: String,
		default: ''
	},
	latitude: {
		type: Number,
		default: ''
	},
	longitude: {
		type: Number,
		default: ''
	},
	address: {
		type: String,
		default: ''
	},
	money: {
		type: Number,
		default: 0
	},
	body: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	tag: {
		type: String,
		default: ''
	},
	read: {
		type: Number,
		default: 1
	},
	comment: {
		type: Number,
		default: 0
	},
	like: {
		type: Number,
		default: 1
	},
	images: {
		type: Array,
		default: ''
	},
	updateDate: {
		type: Date,
		default: '0'
	},
	date: {
		type: String,
		default: getDate()
	},
	time: {
		type: String,
		default: getTime()
	},
	createDate: {
		type: Date,
		default: Date.now
	}
});
var Activity = mongoose.model('Activity', BlogPost);
module.exports = Activity;