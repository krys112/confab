var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
	description: String,
	image: String,
	author: String,
	postNo: Number,
	threadNo: Number,
	date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", commentSchema);