const { PrismaClient } = require('@prisma/client')
const { genSaltSync, hashSync } = require('bcrypt')
const passport = require('../config/passport')

const prisma = new PrismaClient()

exports.signin = async (req, res, next) => {
	passport.authenticate('local', (error, user, errorDetails) => {
		if (error) {
			console.log(error)
			return res.status(500).json({
				message: 'Error',
			})
		}
		if (!user) {
			console.log('nouser')
			return res.status('401').json(errorDetails)
		}

		req.login(user, (err) => {
			if (err) {
				console.log(err)
				return res.status(500).json({
					message: 'Error',
				})
			}

			res.status(200).json(user)
		})
	})(req, res, next)
}

exports.signup = async (req, res) => {
	const { email, password, name } = req.body

	if (!email || !password) {
		return res.status(400).json({
			message: 'Email or password empty',
		})
	}

	const user = await prisma.user.findUnique({
		where: { email },
	})

	if (user) {
		return res.status(400).json({
			message: 'Email already taken',
		})
	}

	const hashPass = hashSync(password, genSaltSync(12))

	const newUser = await prisma.user.create({
		data: {
			email,
			password: hashPass,
			name,
		},
	})

	res.status(201).json(newUser)
}

exports.logout = async (req, res) => {
	req.logout()
	res.status(200).send('logged out')
}

exports.currentUser = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		include: {
			posts: true,
		},
	})
	res.json(user || { message: 'Signin' })
}

exports.editUser = async (req, res) => {
	const { name, avatar } = req.body

	const user = await prisma.user.update({
		where: {
			id: req.user.id,
		},
		data: {
			name,
			avatar,
		},
	})

	res.status(200).json(user)
}
