var express		= require("express"),
	router		= express.Router(),
	passport	= require("passport"),
	User 		= require("../models/user");

// Route for displaying the homepage
router.get("/", function(req, res) {
	res.render("landing");
});

// Route used to display the full size of an image
router.get("/img/:id", function(req, res) {
	res.render("img", {id: req.params.id});
});

// Register route
router.get("/register", function(req, res) {
	res.render("register");
});

// Create a new user route
router.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function() {
			res.redirect("/threads");
		});
	});
});

// Login route
router.get("/login", function(req, res) {
	res.render("login");
});

// Check if user details are correct, redirect accordingly
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/threads",
		failureRedirect: "/login"
	}), function(req, res) {
});

// Logout route
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/threads");
});

module.exports = router;