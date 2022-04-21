const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
    async authorize_user (req, res, next) {
        try {
            const tokens = JSON.parse(req.headers.tokens);

            const access_token = tokens.access_token
            const info = jwt.verify(access_token, config.Access_Key, {},(err, info) => {
                if (err)  {
                    console.log(err.message)
                    throw new Error('wrong token')
                }
                return info
            })

            req.info = info.userInfo
            await next();
        } catch (err) {
            res.status(401).json(err.message);
        }
    }
}
