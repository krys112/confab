var middlewareObj = {};

// Designed to check if a user is authenticated before proceeding with a route
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = middlewareObj;