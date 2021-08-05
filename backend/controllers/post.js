const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.createPost = async (req, res) => {
	const { title, content } = req.body

	const newpost = await prisma.post.create({
		data: {
			title,
			content,
			authorId: req.user.id,
		},
	})

	res.status(201).json(newpost)
}

exports.getPosts = async (req, res) => {
	const posts = await prisma.post.findMany()

	res.status(200).json(posts)
}

exports.getPost = async (req, res) => {
	const { id } = req.params

	const post = await prisma.post.findUnique({
		where: {
			id,
		},
	})
	res.status(200).json(post)
}

exports.updatePost = async (req, res) => {
	const { id } = req.params
	const { title, content } = req.body

	const post = await prisma.post.update({
		where: {
			id,
		},
		data: {
			title,
			content,
		},
	})

	res.status(200).json(post)
}

exports.deletePost = async (req, res) => {
	const { id } = req.params

	await prisma.post.delete({
		where: {
			id,
		},
	})

	res.status(200).json({
		message: 'Post deleted',
	})
}
