var mongoose = require("mongoose");

var counterSchema = new mongoose.Schema({
	totalPosts: Number,
	threadCounter: [Number]
});

module.exports = mongoose.model("Counter", counterSchema);