var mongoose = require("mongoose");

var threadSchema = new mongoose.Schema({
	name: String,
	author: String,
	filename: String,
	myimage: String,
	height: Number,
	width: Number,
	size: Number,
	description: String,
	date: {type: Date, default: Date.now},
	postNo: Number,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Thread", threadSchema);