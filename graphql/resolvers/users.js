const bcrypt = require('bcryptjs')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const {
    validateRegisterInput,
    validateLoginInput,
} = require('../../utils/validators')
const generateToken = require('../../utils/generateToken')

module.exports = {
    Mutation: {
        async register(
            _,
            { registerInput: { username, email, password, confirmPassword } }
        ) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
            )
            if (!valid) {
                throw new UserInputError('Register input error!', { errors })
            }

            // Make sure user doesnt already exist
            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('Username already exists!', {
                    errors: {
                        username: 'This username is taken!',
                    },
                })
            }

            // Hash password and create auth token
            hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new User({
                email,
                username,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
            })
            const res = await newUser.save()
            const token = generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token,
            }
        },
        async login(_, { username, password }) {
            // Validate user data
            const { errors, valid } = validateLoginInput(username, password)

            // If there is an error
            if (!valid) {
                throw new UserInputError('Login input error!', { errors })
            }

            const user = await User.findOne({ username })

            if (!user) {
                errors.general = 'User not found!'
                throw new UserInputError('User not found!', { errors })
            }

            // Check password, error && throw this error
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                errors.general = 'Wrong password!'
                throw new UserInputError('Wrong credentials!', { errors })
            }

            // If no error
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token,
            }
        },
    },
}
