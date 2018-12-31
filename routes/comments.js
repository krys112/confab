var express = require("express");
var router = express.Router({mergeParams: true});
var Thread = require("../models/thread");
var Comment = require("../models/comment");
var Counter = require("../models/counter");
var middleware = require("../middleware");
var multer = require("multer");

// Multer configuration, assigning directory for images
var uploading = multer({
	dest: 'public/uploads/',
});


// Route to display form for adding a new comment
router.get("/new", function(req, res) {
	Thread.findById(req.params.id, function(err, thread) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {thread: thread});
		}
	});
});

// Post route used to upload a new comment to database
router.post("/", uploading.single('image'), function(req, res) {
	var num;
	var threadNo;
	var newComment;
	var author = req.body.author;
	var data = req.file;
	if(data) {
		var image = data.filename;
	}
	var desc = req.body.description;
	Thread.findById(req.params.id, function(err, thread) {
		if(thread.comments.length > 5) {
			err = "Post limit has been reached";
			req.flash("error", "Post limit has been reached for this thread");
		}
		if(err) {
			console.log(err);
			res.redirect("/threads/" + req.params.id);
		} else {
			Counter.find({}).exec(function(err, number) {
				if(err) {
					console.log(err);
				} else {
					// Thread number added to link comment to thread
					num = number[0].totalPosts + 1;
					threadNo = thread.postNo;
					newComment = {author: author, image: image, description: desc, postNo: num, threadNo: threadNo};
					Counter.updateOne({totalPosts: num}, function(err, post) {
						if(err) {
							console.log(err);
						} else {
							Comment.create(newComment, function(err, comment) {
								if(err) {
									console.log(err);
								} else {
									comment.save();
									thread.comments.push(comment);
									thread.save();
									res.redirect("/threads/" + thread._id);
								}
							});
						}
					});
				};
			});
		}
	});
});

// Delete route to delete a given comment based on its id, checks if user is logged in beforehand (admin)
router.delete("/:comment_id", middleware.isLoggedIn, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("back");
		}
	});
});

/*
router.post("/", function(req, res) {
	Thread.findById(req.params.id, function(err, thread) {
		if(err) {
			console.log(err);
			res.redirect("/threads");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					console.log(err);
				} else {
					comment.save();
					console.log("shouldnt this work?" +comment);
					thread.comments.push(comment);
					thread.save();
					res.redirect("/threads/" + thread._id);
				}
			});
		}
	});
});
*/

module.exports = router;