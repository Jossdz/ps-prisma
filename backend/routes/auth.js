const { Router } = require('express')
const router = Router()
const { catchErrors, isAuth } = require('../middlewares')

const {
	signin,
	signup,
	logout,
	currentUser,
	editUser,
} = require('../controllers/auth')

// signup
router
	.post('/signup', catchErrors(signup))
	.post('/signin', catchErrors(signin))
	.get('/logout', catchErrors(logout))
	.get('/current-user', catchErrors(currentUser))
	.put('/edit', isAuth, catchErrors(editUser))

module.exports = router
