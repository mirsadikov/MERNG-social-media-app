const jwt = require('jsonwebtoken')

module.exports = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    )
}
