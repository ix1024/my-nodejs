var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var activity = new Schema({
	id: ObjectId,
	author: {
		type: String,
		default: 'admin'
	},
	activityId: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	},
	avatarUrl: {
		type: String,
		default: ''
	},
	createDate: {
		type: Date,
		default: Date.now
	}
});
var ActivityUser = mongoose.model('ActivityUser', activity);
module.exports = ActivityUser;