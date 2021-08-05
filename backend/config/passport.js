const bcrypt = require('bcrypt')
const passport = require('passport')
const { PrismaClient } = require('@prisma/client')
const LStrategy = require('passport-local').Strategy

const prisma = new PrismaClient()

passport.serializeUser((user, callback) => {
	callback(null, user.id)
})

passport.deserializeUser(async (id, callback) => {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	})
	callback(null, user)
})

passport.use(
	new LStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			try {
				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				})

				if (!user) return done(null, false)

				if (!bcrypt.compareSync(password, user.password))
					return done(null, false)

				return done(null, user)
			} catch (error) {
				if (error) return done(error)
			}
		}
	)
)

module.exports = passport
