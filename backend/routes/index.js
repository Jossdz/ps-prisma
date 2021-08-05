const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
	const allUsers = await prisma.user.findMany() // -> SELECT * FROM users;
	console.log(allUsers)
	res.status(200).json({ msg: 'Working' })
})

router.get('/create', async (req, res) => {
	await prisma.user.create({
		data: {
			name: 'Alice',
			email: 'alicess@prisma.io',
			posts: {
				create: { title: 'Hello World' },
			},
			profile: {
				create: { bio: 'I like turtles' },
			},
		},
	})

	const allUsers = await prisma.user.findMany({
		include: {
			posts: true,
			profile: true,
		},
	})

	res.json({ allUsers })
})

module.exports = router
