var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var Tpl = new Schema({
	id: ObjectId,
	author: {
		type: String,
		default: 'admin'
	},
	name: {
		type: String,
		default: ''
	},
	total: {
		type: Number,
		default: 0
	},
	body: {
		type: String,
		default: ''
	},
	like: {
		type: Number,
		default: 1
	},
	image: {
		type: String,
		default: ''
	},
	createDate: {
		type: Date,
		default: Date.now
	}
});
var Tepmlate = mongoose.model('Tepmlate', Tpl);
module.exports = Tepmlate;