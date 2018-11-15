var express		= require("express"),
	app 		= express(),
	bodyParser	= require("body-parser"),
	mongoose	= require("mongoose"),
	passport	= require("passport"),
	flash		= require("connect-flash"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Thread 		= require("./models/thread"),
	Comment 	= require("./models/comment");
	User		= require("./models/user");

// Route shortcuts
var indexRoutes		= require("./routes/index");
var threadRoutes	= require("./routes/threads");
var commentRoutes	= require("./routes/comments");

// MongoDB and general configuration
mongoose.connect("mongodb://krys112:biomadkip1@ds037047.mlab.com:37047/heroku_s5tnm0tv");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

// Passport configuration
app.use(require("express-session")({
	secret: "Once again rusty wins",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// User feedback configuration using connect flash
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/threads", threadRoutes);
app.use("/threads/:id/comments", commentRoutes);

// Assigning app to an open port
let port = process.env.PORT;
if (port == null || port == "") {
	port = 3000;
}
app.listen(port, function() {
	console.log("Server has been started");
});