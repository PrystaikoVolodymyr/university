const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
    generateAccessAndRefreshToken(userInfo) {
        const access_token = jwt.sign({userInfo: userInfo}, config.Access_Key, { expiresIn: '10m'})
        const refresh_token = jwt.sign({userInfo: userInfo}, config.Refresh_Key, { expiresIn: '1h'})

        return {
            access_token,
            refresh_token
        }

    },

    generateToken(userInfo) {
        const token = jwt.sign({userInfo: userInfo}, config.Token_key, { expiresIn: '10m'})

        return token
    }
}
