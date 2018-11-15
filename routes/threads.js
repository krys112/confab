var express = require("express");
var router = express.Router();
var Thread = require("../models/thread");
var Comment = require("../models/comment");
var Counter = require("../models/counter");
var middleware = require("../middleware");
var multer = require("multer");
var sizeOf = require("image-size");
var path = require("path");

// Multer configuration, assigning directory for images
var uploading = multer({
	dest: 'public/uploads/',
	fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 10240 * 10240
    }
});

// Index route for displaying all the threads, requires all comments
router.get("/", function(req, res) {
	Thread.find({}).populate("comments").exec(function(err, allthreads) {
		if(err) {
			console.log(err);
		} else {
			Comment.find({}).exec(function(err, comments) {
				if(err) {
					console.log(err);
				} else {
					Counter.find({}).exec(function(err, number) {
						if(err) {
							console.log(err);
						} else {
							console.log("current user is "+req.user);
							res.render("threads/index", {threads: allthreads, comments: comments, counter: number, currentUser: req.user});
						}
					});
				}
			});
		}
	});
});

var itemObject;

// Post route for storing a provided new thread into the database
router.post("/", uploading.single('myimage'), function(req, res) {
	var num = 1;
	var threadCount = [];
	var name = req.body.name;
	var author = req.body.author;
	var data = req.file;
	var desc = req.body.description;
	var newThread;
	if(data) {
		// Image specifications derived from the uploaded file
		var filename = data.originalname;
		var myimage = data.filename;
		var size = data.size;
		var dir = "public/uploads/" + myimage;
		var width = sizeOf(dir).width;
		var height = sizeOf(dir).height;
		Counter.find({}).exec(function(err, number) {
				if(err) {
					console.log(err);
				} else {
					// Increase post count by one, also add post number to array of existing threads
					if(number.length > 0) {
						num = number[0].totalPosts + 1;
						threadCount = number[0].threadCounter;
						threadCount.push(num);
					} else {
						num = 1;
						threadCount.push(num);
						Counter.create({totalPosts: num, threadCounter: threadCount}, function(err, counter) {
							if(err) {
								console.log(err);
							}
						});
					}
					newThread = {name: name, author: author, filename: filename, myimage: myimage, width: width, height: height, size: size, description: desc, postNo: num};
					Counter.updateMany({totalPosts: num, threadCounter: threadCount}, function(err, post) {
						if(err) {
							console.log(err);
						} else {
							Thread.create(newThread, function(err, thread) {
								if(err) {
									console.log(err);
								} else {
									res.redirect("/threads");
								}
							});
						}
					}); 
				}
			});
	} else {
		// Legacy as this code would accept any file, regardless if it was an image or not, will be updated
		req.flash("error", "Please specify an image when posting a thread");
		res.redirect("/threads/new");
	}
});

// Route to show the form for creating a new thread
router.get("/new", function(req, res) {
	res.render("threads/new");
});

// Route to display a particular thread and its comments
router.get("/:id", function(req, res) {
	Thread.findById(req.params.id).populate("comments").exec(function(err, foundThread) {
		if(err) {
			console.log(err);
		} else {
			res.render("threads/show", {thread: foundThread});
		}
	});
});

// Route used to delete a given thread using its id, middleware to check if user is logged in (admin)
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
	Thread.findById(req.params.id).exec(function(err, foundThread) {
		if(err) {
			console.log(err);
		} else {
			for(var i = 0; i < foundThread.comments.length; i++) {
				var remComment = foundThread.comments[i];
				Comment.findByIdAndRemove(remComment, function(err) {
					if(err) {
						res.redirect("/threads");
					} else {

					}
				});
			}
			// Update array of existing threads
			Counter.find({}).exec(function(err, number) {
				if(err) {
					console.log(err);
				} else {
					var threadcount = number[0].threadCounter;
					var countIndex = threadcount.indexOf(foundThread.postNo);
					threadcount.splice(countIndex, 1);
					Counter.updateOne({threadCounter: threadcount}, function(err, post) {
						if(err) {
							console.log(err);
						} else {
							Thread.findByIdAndRemove(req.params.id, function(err) {
								if(err) {
									res.redirect("/threads");
								} else {
									console.log("delete successful")
									res.redirect("/threads");
								}
							});
						}
					});
				}
			});
		}
	});
	/*threadCount.indexOf(comments[commentNo].threadNo)
	Thread.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/threads");
		} else {
			res.redirect("/threads");
		}
	});
	*/
});

module.exports = router;