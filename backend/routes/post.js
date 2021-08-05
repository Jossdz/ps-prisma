const { Router } = require('express')

const { catchErrors, isAuth } = require('../middlewares')
const {
	createPost,
	deletePost,
	getPost,
	getPosts,
	updatePost,
} = require('../controllers/post')

const router = Router()

router
	.route('/')
	.get(catchErrors(getPosts))
	.post(isAuth, catchErrors(createPost))

router
	.route('/:id')
	.get(catchErrors(getPost))
	.put(isAuth, catchErrors(updatePost))
	.delete(isAuth, catchErrors(deletePost))

module.exports = router
