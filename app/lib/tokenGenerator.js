const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
    generateAccessAndRefreshToken() {
        const access_token = jwt.sign({}, config.Access_Key, { expiresIn: '10m'})
        const refresh_token = jwt.sign({}, config.Refresh_Key, { expiresIn: '1h'})

        return {
            access_token,
            refresh_token
        }

    },

    generateToken(info) {
        const token = jwt.sign({userInfo: info}, config.Token_key, { expiresIn: '10m'})

        return token
    }
}
