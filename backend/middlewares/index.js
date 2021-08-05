exports.catchErrors = (controller) => (req, res, next) =>
	controller(req, res).catch(next)

exports.isAuth = (req, res, next) => {
	if (req.isAuthenticated()) return next()
	return res.status(401).json({
		message: 'You must sign in',
	})
}
